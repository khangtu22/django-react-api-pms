# Generated by Django 3.2.3 on 2021-06-01 13:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('trips', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookingOffice',
            fields=[
                ('officeID', models.AutoField(primary_key=True, serialize=False)),
                ('officeName', models.CharField(max_length=20)),
                ('officePhone', models.CharField(max_length=20)),
                ('officePlace', models.CharField(max_length=50)),
                ('officePrice', models.IntegerField()),
                ('startContractDeadline', models.DateField()),
                ('endContractDeadline', models.DateField()),
                ('tripID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trips.trip')),
            ],
        ),
    ]
