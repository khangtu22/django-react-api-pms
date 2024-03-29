# Generated by Django 3.2.3 on 2021-06-01 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Trip',
            fields=[
                ('tripID', models.AutoField(primary_key=True, serialize=False)),
                ('bookedTicketNumber', models.IntegerField()),
                ('carType', models.CharField(max_length=50)),
                ('departureDate', models.DateField()),
                ('departureTime', models.TimeField()),
                ('destination', models.CharField(max_length=50)),
                ('driver', models.CharField(max_length=50)),
                ('maximumOnlineTicketNumber', models.IntegerField()),
            ],
        ),
    ]
