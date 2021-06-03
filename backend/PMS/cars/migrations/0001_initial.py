# Generated by Django 3.2.3 on 2021-06-01 13:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('parking_lot', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('licensePlate', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('carColor', models.CharField(max_length=20)),
                ('carType', models.CharField(max_length=20)),
                ('company', models.CharField(max_length=30)),
                ('parkID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parking_lot.parkinglot')),
            ],
        ),
    ]