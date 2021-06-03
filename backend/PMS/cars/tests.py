from django.test import TestCase

# Create your tests here.
from cars.models import Car
from parking_lot.models import ParkingLot


class CarTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        parkingLot = ParkingLot.objects.create(parkID=1, parkArea=120, parkName="FPT",
                                               parkPlace='Hanoi', parkPrice=2100,
                                               parkStatus='available')
        parkingLot.save()
        car = Car.objects.create(licensePlate='I123AA', carColor='red', carType='BMW', company='FPT', parkID=parkingLot)
        car.save()

    def test_car_color(self):
        car = Car.objects.get(licensePlate='I123AA')
        expected_object_name = f'{car.carColor}'
        self.assertEqual(expected_object_name, 'red')

    def test_car_type(self):
        car = Car.objects.get(licensePlate='I123AA')
        expected_object_name = f'{car.carType}'
        self.assertEqual(expected_object_name, 'BMW')

    def test_company(self):
        car = Car.objects.get(licensePlate='I123AA')
        expected_object_name = f'{car.company}'
        self.assertEqual(expected_object_name, 'FPT')

    def test_park_id(self):
        car = Car.objects.get(licensePlate='I123AA')
        expected_object_name = f'{car.parkID.parkID}'
        self.assertEqual(expected_object_name, '1')