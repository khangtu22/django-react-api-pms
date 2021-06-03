from rest_framework.routers import SimpleRouter

from parking_lot.views import ParkingLotView

router = SimpleRouter()
router.register('', ParkingLotView, basename='parking_lots')

urlpatterns = router.urls
