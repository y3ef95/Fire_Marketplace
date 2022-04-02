from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Product, Comment,Category


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass
    def photo_tag(self, post):
        return mark_safe(f"<img src={post.photo.url} style='width: 100px;' />")

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass

@admin.register(Category)
class TagAdmin(admin.ModelAdmin):
    pass
