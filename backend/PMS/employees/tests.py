from django.test import TestCase
from .models import Employee


# Create your tests here.


class EmployeeModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        testEmployee = Employee.objects.create(account='Johnson', department='FPT', employeeAddress='USA',
                                               employeeBirthDate="1998-01-12", employeeName='John',
                                               employeePhone="0988227123",
                                               password="ajkshdkH@#")
        testEmployee.save()

    def test_employee_id(self):
        employee = Employee.objects.get(employeeID=1)
        expected_object_name = f'{employee.employeeID}'
        self.assertEqual(expected_object_name, '1')

    def test_account(self):
        employee = Employee.objects.get(employeeID=1)
        expected_object_name = f'{employee.account}'
        self.assertEqual(expected_object_name, 'Johnson')

    def test_department(self):
        employee = Employee.objects.get(employeeID=1)
        expected_object_name = f'{employee.department}'
        self.assertEqual(expected_object_name, 'FPT')

    def test_employee_address(self):
        employee = Employee.objects.get(employeeID=1)
        expected_object_name = f'{employee.employeeAddress}'
        self.assertEqual(expected_object_name, 'USA')

    def test_employee_birth_date(self):
        employees = Employee.objects.get(employeeID=1)
        expected_object_name = f'{employees.employeeBirthDate}'
        self.assertEqual(expected_object_name, '1998-01-12')

    def test_employee_name(self):
        employees = Employee.objects.get(employeeID=1)
        expected_object_name = f'{employees.employeeName}'
        self.assertEqual(expected_object_name, 'John')

    def test_employee_phone(self):
        employees = Employee.objects.get(employeeID=1)
        expected_object_name = f'{employees.employeePhone}'
        self.assertEqual(expected_object_name, '0988227123')

    def test_password(self):
        employees = Employee.objects.get(employeeID=1)
        expected_object_name = f'{employees.password}'
        self.assertEqual(expected_object_name, 'ajkshdkH@#')
