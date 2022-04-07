# Generated by Django 3.0.14 on 2022-04-02 04:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contents', '0008_remove_product_product_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='author',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='product',
        ),
        migrations.RemoveField(
            model_name='product',
            name='product_category',
        ),
        migrations.RemoveField(
            model_name='product',
            name='product_like',
        ),
        migrations.RemoveField(
            model_name='product',
            name='writer',
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
        migrations.DeleteModel(
            name='Product',
        ),
    ]