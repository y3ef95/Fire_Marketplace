import re
import datetime
from django.conf import settings
from django.db import models
from django.urls import reverse
from django.conf import settings

def product_images_url(instance,filename):
    now = datetime.datetime.now()
    path = f"accounts/{instance.writer}/product/{now.year}/{now.month}/{now.day}/{filename}"
    return path

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Product(TimeStampedModel):
    class ProductConditionChoice(models.TextChoices):
        used = "중고"
        new = "새상품"
    class ExchangeChoice(models.TextChoices):
        non_exchangeable = "교환불가"
        exchangeable = "교환가능"
    class DeliveryIncludedChoice(models.Choices):
        included = "배송비 포함"
        not_included = "배송비 미포함"


    writer = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="my_product_set",on_delete=models.CASCADE,verbose_name="작성자")
    product_image = models.ImageField(upload_to=product_images_url,verbose_name="상품 이미지")
    product_name = models.CharField(max_length=255,verbose_name="상품명")
    product_price = models.IntegerField(verbose_name="가격")
    #TODO:좋아요 기능 구현하기
    product_like = models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True,related_name="like_product_set",verbose_name="찜")
    #TODO:조회수 기능 구현하기
    product_hits = models.PositiveIntegerField(default=0,verbose_name="조회수")
    product_condition = models.CharField(max_length=20,choices=ProductConditionChoice.choices,verbose_name="상품상태")
    exchange_or_not = models.CharField(max_length=20,choices=ExchangeChoice.choices,verbose_name="교환여부")
    delivery_included = models.CharField(max_length=20,choices=DeliveryIncludedChoice.choices,verbose_name="배송비 포함 여부")
    trading_location = models.CharField(max_length=50,verbose_name="거래 지역")
    product_desc = models.TextField(verbose_name="상품 정보")
    product_count = models.IntegerField(verbose_name="수량")
    product_category = models.ForeignKey("Category",default="1",related_name="product_category_set",on_delete=models.CASCADE)

class Comment(TimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ["-id"]

class Category(TimeStampedModel):
    category_name = models.CharField(max_length=255,unique=True)

    def __str__(self):
        return self.category_name

