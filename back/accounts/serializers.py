from rest_framework import serializers
from django.contrib.auth import get_user_model

# 객체 인스턴스로 리턴 받은 사용자 모델 참조
User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    # 패스워드는 보안을 위해 write_only를 True로 설정
    password = serializers.CharField(write_only=True,required=True)
    confirm_password = serializers.CharField(write_only=True,required=True)
    def create(self, validated_data):
        user = User.objects.create(email=validated_data["email"],
                                   username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user

    def validate(self, data):
        if not data.get('password') or not data.get('confirm_password'):
            raise serializers.ValidationError("비밀번호를 확인해주세요!")
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("비밀번호가 일치하지 않습니다!")
        return data

    class Meta:
        model = User
        fields = ["pk", "email","username", "password","confirm_password"]