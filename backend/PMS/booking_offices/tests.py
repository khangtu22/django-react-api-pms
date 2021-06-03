from django.test import TestCase

# Create your tests here.
from booking_offices.models import BookingOffice
from trips.models import Trip


class BookingOfficeTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        testTripsModel = Trip.objects.create(tripID=1, bookedTicketNumber=0, carType='BMW',
                                             departureDate='2020-02-01', departureTime='12:02:00',
                                             destination='Hanoi', driver='Big Shot',
                                             maximumOnlineTicketNumber=12)
        testTripsModel.save()

        testBookingOffice = BookingOffice.objects.create(officeName='FPT', officePhone='0988472323',
                                                         officePlace='Hanoi', officePrice=2000,
                                                         startContractDeadline='2020-02-01',
                                                         endContractDeadline='2021-02-01', tripID=testTripsModel)
        testBookingOffice.save()

    def test_office_name(self):
        bookingOffice = BookingOffice.objects.get(officeID=1)
        expected_object_name = f'{bookingOffice.officeName}'
        self.assertEqual(expected_object_name, 'FPT')

    def test_office_phone(self):
        bookingOffice = BookingOffice.objects.get(officeID=1)
        expected_object_name = f'{bookingOffice.officePhone}'
        self.assertEqual(expected_object_name, '0988472323')

    def test_office_place(self):
        bookingOffice = BookingOffice.objects.get(officeID=1)
        expected_object_name = f'{bookingOffice.officePlace}'
        self.assertEqual(expected_object_name, 'Hanoi')

    def test_office_price(self):
        bookingOffice = BookingOffice.objects.get(officeID=1)
        expected_object_name = f'{bookingOffice.officePrice}'
        self.assertEqual(expected_object_name, '2000')

    def test_office_start_contract(self):
        bookingOffice = BookingOffice.objects.get(officeID=1)
        expected_object_name = f'{bookingOffice.startContractDeadline}'
        self.assertEqual(expected_object_name, '2020-02-01')

    def test_office_end_contract(self):
        bookingOffice = BookingOffice.objects.get(officeID=1)
        expected_object_name = f'{bookingOffice.endContractDeadline}'
        self.assertEqual(expected_object_name, '2021-02-01')

    def test_trip_id(self):
        bookingOffice = BookingOffice.objects.get(officeID=1)
        expected_object_name = f'{bookingOffice.tripID.tripID}'
        self.assertEqual(expected_object_name, '1')