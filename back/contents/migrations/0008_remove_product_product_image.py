# Generated by Django 3.0.14 on 2022-04-02 04:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contents', '0007_comment_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='product_image',
        ),
    ]