export function extractMarkdownSection(fullMarkdown: string, selectedText: string): string {
  if (!fullMarkdown || !selectedText) return selectedText;
  
  // Normalize the selected text for comparison
  const normalizedSelected = selectedText.replace(/\s+/g, ' ').trim();
  
  // Split markdown into lines
  const lines = fullMarkdown.split('\n');
  let bestMatch = selectedText;
  let bestMatchScore = 0;
  
  // Try to find the selected text in the markdown
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const normalizedLine = line.replace(/\s+/g, ' ').trim();
    
    // Check if this line contains part of the selected text
    if (normalizedLine && normalizedSelected.includes(normalizedLine)) {
      // Found a line that's part of the selection
      const extractedLines = [];
      let currentLine = i;
      
      // Go back to find the start of the section (heading or paragraph start)
      while (currentLine > 0) {
        const prevLine = lines[currentLine - 1];
        if (prevLine.trim() === '' || prevLine.startsWith('#')) {
          break;
        }
        currentLine--;
      }
      
      // Extract lines from the section start
      let sectionContent = '';
      let matchFound = false;
      
      for (let j = currentLine; j < lines.length; j++) {
        const currentLineContent = lines[j];
        extractedLines.push(currentLineContent);
        
        // Check if we've captured the selected text
        const currentExtracted = extractedLines.join('\n');
        const normalizedExtracted = currentExtracted.replace(/\s+/g, ' ').trim();
        
        if (normalizedExtracted.includes(normalizedSelected)) {
          matchFound = true;
        }
        
        // Stop if we've captured the selection and hit a section boundary
        if (matchFound && j > i) {
          const nextLine = lines[j + 1];
          if (!nextLine || nextLine.trim() === '' || nextLine.startsWith('#')) {
            sectionContent = extractedLines.join('\n').trim();
            break;
          }
        }
        
        // Safety limit
        if (extractedLines.length > 50) {
          sectionContent = extractedLines.join('\n').trim();
          break;
        }
      }
      
      // Calculate match score based on how well the extracted content matches
      if (sectionContent) {
        const normalizedSection = sectionContent.replace(/\s+/g, ' ').trim();
        const matchRatio = normalizedSelected.length / normalizedSection.length;
        
        // Prefer sections that are close in size to the selection
        const score = matchRatio * (normalizedSection.includes(normalizedSelected) ? 1 : 0.5);
        
        if (score > bestMatchScore) {
          bestMatchScore = score;
          bestMatch = sectionContent;
        }
      }
    }
  }
  
  // If we didn't find a good match, try to extract based on common patterns
  if (bestMatchScore < 0.3) {
    // Try to find headings or list items that contain the selected text
    const selectedWords = normalizedSelected.split(' ').slice(0, 5).join(' ');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const normalizedLine = line.replace(/\s+/g, ' ').trim();
      
      if (normalizedLine.includes(selectedWords)) {
        // Check if this is a heading
        if (line.startsWith('#')) {
          bestMatch = line;
          break;
        }
        
        // Check if this is a list item
        if (line.match(/^[\s]*[-*+]\s/) || line.match(/^[\s]*\d+\.\s/)) {
          // Extract the full list item (could be multi-line)
          let listItem = line;
          let j = i + 1;
          
          while (j < lines.length && lines[j].match(/^[\s]{2,}/)) {
            listItem += '\n' + lines[j];
            j++;
          }
          
          bestMatch = listItem.trim();
          break;
        }
        
        // Otherwise, extract the paragraph
        const paragraph = [];
        let j = i;
        
        // Go back to paragraph start
        while (j > 0 && lines[j - 1].trim() !== '') {
          j--;
        }
        
        // Extract full paragraph
        while (j < lines.length && lines[j].trim() !== '') {
          paragraph.push(lines[j]);
          j++;
        }
        
        if (paragraph.length > 0) {
          bestMatch = paragraph.join('\n').trim();
          break;
        }
      }
    }
  }
  
  return bestMatch;
}