from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("products", views.ProductViewSet)
router.register(r"products/(?P<product_pk>\d+)/comments", views.CommentViewSet)


urlpatterns = [
    path("api/", include(router.urls)),
]
