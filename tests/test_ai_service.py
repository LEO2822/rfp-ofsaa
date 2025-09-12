import pytest
from services.ai_service import *

import pytest


@pytest.fixture
def openrouterservice_instance():
    """Fixture for OpenRouterService instance."""
    return OpenRouterService()
