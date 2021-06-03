from rest_framework.routers import SimpleRouter

from cars.views import CarView

router = SimpleRouter()
router.register('', CarView, basename="cars")

urlpatterns = router.urls