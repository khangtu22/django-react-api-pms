from rest_framework.routers import SimpleRouter

from tickets.views import TicketView

router = SimpleRouter()

router.register('', TicketView, basename='tickets')

urlpatterns = router.urls
