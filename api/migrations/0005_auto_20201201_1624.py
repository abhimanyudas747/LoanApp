# Generated by Django 2.2.14 on 2020-12-01 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_typea_typeb'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='Installment',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='application',
            name='Loanamt',
            field=models.FloatField(null=True),
        ),
    ]
