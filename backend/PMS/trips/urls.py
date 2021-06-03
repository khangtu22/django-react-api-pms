from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import TripViewSet

router = SimpleRouter()
router.register('', TripViewSet, basename='trips')

# urlpatterns = [
#     path('forgot-password/', ForgotPasswordFormView.as_view()),
# ]

urlpatterns = router.urls

