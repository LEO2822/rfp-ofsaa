import pytest
from chat_with_doc_backend import *

import pytest


@pytest.fixture
def chatrequest_instance():
    """Fixture for ChatRequest instance."""
    return ChatRequest()


def test_setup_chat_with_doc_routes():
    """Test setup_chat_with_doc_routes function."""
    # Test basic functionality
    result = setup_chat_with_doc_routes(app)
    assert result is not None
