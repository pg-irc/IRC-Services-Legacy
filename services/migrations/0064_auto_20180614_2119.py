# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2018-06-14 21:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0063_auto_20180502_1047'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contactinformation',
            name='name',
        ),
        migrations.RemoveField(
            model_name='contactinformation',
            name='title',
        ),
        migrations.AddField(
            model_name='provider',
            name='contact_name',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='contact_name'),
        ),
        migrations.AddField(
            model_name='provider',
            name='title',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='title'),
        ),
    ]