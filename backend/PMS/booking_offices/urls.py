from rest_framework.routers import SimpleRouter

from booking_offices.views import BookingOfficeView

router = SimpleRouter()
router.register('', BookingOfficeView, basename='booking_offices')

urlpatterns = router.urls
