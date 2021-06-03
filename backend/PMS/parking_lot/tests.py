from django.test import TestCase
from parking_lot.models import ParkingLot
# Create your tests here.


class ParkingLotTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        parkingLot = ParkingLot.objects.create(parkArea=120, parkName="FPT",
                                               parkPlace='Hanoi', parkPrice=2100,
                                               parkStatus='available')
        parkingLot.save()

    def test_parking_lot_parkID(self):
        parkingLot = ParkingLot.objects.get(parkID=1)
        expected_object_name = f'{parkingLot.parkID}'
        self.assertEqual(expected_object_name, '1')

    def test_parking_lot_area(self):
        parkingLot = ParkingLot.objects.get(parkID=1)
        expected_object_name = f'{parkingLot.parkArea}'
        self.assertEqual(expected_object_name, '120')

    def test_parking_lot_name(self):
        parkingLot = ParkingLot.objects.get(parkID=1)
        expected_object_name = f'{parkingLot.parkName}'
        self.assertEqual(expected_object_name, 'FPT')

    def test_parking_lot_place(self):
        parkingLot = ParkingLot.objects.get(parkID=1)
        expected_object_name = f'{parkingLot.parkPlace}'
        self.assertEqual(expected_object_name, 'Hanoi')

    def test_parking_lot_price(self):
        parkingLot = ParkingLot.objects.get(parkID=1)
        expected_object_name = f'{parkingLot.parkPrice}'
        self.assertEqual(expected_object_name, '2100')

    def test_parking_lot_status(self):
        parkingLot = ParkingLot.objects.get(parkID=1)
        expected_object_name = f'{parkingLot.parkStatus}'
        self.assertEqual(expected_object_name, 'available')

