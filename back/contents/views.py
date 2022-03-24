from datetime import timedelta
from django.db.models import Q
from django.shortcuts import render
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Product, Comment
from .serializers import ProductSerializer, CommentSerializer

class ProductViewSet(ModelViewSet):
    queryset = (
        Product.objects.all()
        .select_related("writer")
        .prefetch_related("tag_set")
    )
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save(writer=self.request.user)
        return super().perform_create(serializer)

    @action(detail=True, methods=["POST"])
    def like(self, request, pk):
        post = self.get_object()
        post.product_like.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @like.mapping.delete
    def unlike(self, request, pk):
        post = self.get_object()
        post.product_like.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs["post_pk"])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(Product, pk=self.kwargs["post_pk"])
        serializer.save(writer=self.request.user, post=post)
        return super().perform_create(serializer)