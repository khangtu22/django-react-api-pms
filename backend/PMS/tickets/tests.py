from django.test import TestCase

# Create your tests here.
from cars.models import Car
from parking_lot.models import ParkingLot
from tickets.models import Ticket
from trips.models import Trip


class TicketTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        parkingLot = ParkingLot.objects.create(parkArea=120, parkName="FPT",
                                               parkPlace='Hanoi', parkPrice=2100,
                                               parkStatus='available')
        parkingLot.save()
        car = Car.objects.create(licensePlate='I123AA', carColor='red', carType='BMW', company='FPT', parkID=parkingLot)
        car.save()
        testTripsModel = Trip.objects.create(bookedTicketNumber=0, carType='BMW',
                                             departureDate='2020-02-01', departureTime='12:02:00',
                                             destination='Hanoi', driver='Big Shot',
                                             maximumOnlineTicketNumber=12)
        testTripsModel.save()

        testTicket = Ticket.objects.create(ticketID=1, bookTime="12:12:00", customerName='Jhon',
                                           licensePlate=car, tripID=testTripsModel)
        testTicket.save()

    def test_book_time(self):
        ticket = Ticket.objects.get(ticketID=1)
        expected_object_name = f'{ticket.bookTime}'
        self.assertEqual(expected_object_name, '12:12:00')

    def test_customer_name(self):
        ticket = Ticket.objects.get(ticketID=1)
        expected_object_name = f'{ticket.customerName}'
        self.assertEqual(expected_object_name, 'Jhon')

    def test_license_template(self):
        ticket = Ticket.objects.get(ticketID=1)
        expected_object_name = f'{ticket.licensePlate.licensePlate}'
        self.assertEqual(expected_object_name, 'I123AA')

    def test_trip_id(self):
        ticket = Ticket.objects.get(ticketID=1)
        expected_object_name = f'{ticket.tripID.tripID}'
        self.assertEqual(expected_object_name, '1')
