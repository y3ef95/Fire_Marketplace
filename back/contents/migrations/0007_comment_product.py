# Generated by Django 3.0.14 on 2022-04-01 10:21

import contents.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contents', '0006_auto_20220401_1920'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('product_image', models.ImageField(upload_to=contents.models.product_images_url, verbose_name='상품 이미지')),
                ('product_name', models.CharField(max_length=255, verbose_name='상품명')),
                ('product_price', models.IntegerField(verbose_name='가격')),
                ('product_hits', models.PositiveIntegerField(default=0, verbose_name='조회수')),
                ('product_condition', models.CharField(choices=[('중고', 'Used'), ('새상품', 'New')], max_length=20, verbose_name='상품상태')),
                ('exchange_or_not', models.CharField(choices=[('교환불가', 'Non Exchangeable'), ('교환가능', 'Exchangeable')], max_length=20, verbose_name='교환여부')),
                ('delivery_included', models.CharField(choices=[('배송비 포함', 'Included'), ('배송비 미포함', 'Not Included')], max_length=20, verbose_name='배송비 포함 여부')),
                ('trading_location', models.CharField(max_length=50, verbose_name='거래 지역')),
                ('product_desc', models.TextField(verbose_name='상품 정보')),
                ('product_count', models.IntegerField(verbose_name='수량')),
                ('product_category', models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='product_category_set', to='contents.Category')),
                ('product_like', models.ManyToManyField(blank=True, related_name='like_product_set', to=settings.AUTH_USER_MODEL, verbose_name='찜')),
                ('writer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='my_product_set', to=settings.AUTH_USER_MODEL, verbose_name='작성자')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('message', models.TextField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contents.Product')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
    ]