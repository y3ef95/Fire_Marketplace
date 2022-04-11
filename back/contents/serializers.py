import re
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Product, Comment

class AuthorSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    def avatar_url_field(self, writer):
        if re.match(r"^https?://", writer.avatar_url):
            return writer.avatar_url

        if "request" in self.context:
            scheme = self.context["request"].scheme
            host = self.context["request"].get_host()
            return scheme + "://" + host + writer.avatar_url

    class Meta:
        model = get_user_model()
        fields = ["email", "username", "avatar_url"]


class ProductSerializer(serializers.ModelSerializer):
    writer = AuthorSerializer(read_only=True)
    is_like = serializers.SerializerMethodField("is_like_field")
    likes = serializers.SerializerMethodField("likes_field")

    def likes_field(self,product):
        return product.product_like.count()

    def is_like_field(self, product):
        if "request" in self.context:
            user = self.context["request"].user
            return product.product_like.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = Product
        fields = [
            "id",
            "writer",
            "product_name",
            "product_price",
            "product_like",
            "product_hits",
            "product_condition",
            "exchange_or_not",
            "delivery_included",
            "trading_location",
            "product_desc",
            "product_image",
            "product_count",
            "created_at",
            "is_like",
            "likes",
            ]

class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"