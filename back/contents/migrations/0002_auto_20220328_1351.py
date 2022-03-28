# Generated by Django 3.0.14 on 2022-03-28 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contents', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='post',
            new_name='product',
        ),
        migrations.AlterField(
            model_name='product',
            name='trading_location',
            field=models.CharField(max_length=50, verbose_name='거래 지역'),
        ),
    ]
