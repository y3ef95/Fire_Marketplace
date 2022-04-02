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
    class Meta:
        model = Product
        fields = ["id","writer",
                  "product_image",
                  "product_name",
                  "product_category",
                  "trading_location",
                  "product_condition",
                  "exchange_or_not",
                  "delivery_included",
                  "product_price",
                  "product_desc",
                  "product_count",
                  "product_like",
                  "product_hits"]


class CommentSerializer(serializers.ModelSerializer):
    writer = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"