# Generated by Django 3.2.3 on 2021-06-01 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ParkingLot',
            fields=[
                ('parkID', models.AutoField(primary_key=True, serialize=False)),
                ('parkArea', models.IntegerField()),
                ('parkName', models.CharField(max_length=30)),
                ('parkPlace', models.CharField(max_length=60)),
                ('parkPrice', models.IntegerField()),
                ('parkStatus', models.CharField(max_length=20)),
            ],
        ),
    ]