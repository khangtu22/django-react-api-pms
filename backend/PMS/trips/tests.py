from django.test import TestCase

# Create your tests here.
from trips.models import Trip


class TripModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        testTripsModel = Trip.objects.create(bookedTicketNumber=0, carType='BMW',
                                             departureDate='2020-02-01', departureTime='12:02:00',
                                             destination='Hanoi', driver='Big Shot',
                                             maximumOnlineTicketNumber=12)
        testTripsModel.save()

    def test_trip_id(self):
        trip = Trip.objects.get(tripID=1)
        expected_object_name = f'{trip.tripID}'
        self.assertEqual(expected_object_name, '1')

    def test_booked_ticket_number(self):
        trip = Trip.objects.get(tripID=1)
        expected_object_name = f'{trip.bookedTicketNumber}'
        self.assertEqual(expected_object_name, '0')

    def test_car_type(self):
        trip = Trip.objects.get(tripID=1)
        expected_object_name = f'{trip.carType}'
        self.assertEqual(expected_object_name, 'BMW')

    def test_departure_date(self):
        trip = Trip.objects.get(tripID=1)
        expected_object_name = f'{trip.departureDate}'
        self.assertEqual(expected_object_name, '2020-02-01')

    def test_departure_time(self):
        trip = Trip.objects.get(tripID=1)
        expected_object_name = f'{trip.departureTime}'
        self.assertEqual(expected_object_name, '12:02:00')

    def test_destination(self):
        trip = Trip.objects.get(tripID=1)
        expected_object_name = f'{trip.destination}'
        self.assertEqual(expected_object_name, 'Hanoi')

    def test_driver(self):
        trip = Trip.objects.get(tripID=1)
        expected_object_name = f'{trip.driver}'
        self.assertEqual(expected_object_name, 'Big Shot')

    def test_maximum_ticket_number(self):
        trip = Trip.objects.get(tripID=1)
        expected_object_name = f'{trip.maximumOnlineTicketNumber}'
        self.assertEqual(expected_object_name, '12')

