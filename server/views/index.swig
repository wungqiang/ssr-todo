{% extends "layout/layout.swig" %}

{% block main %}

{% autoescape %}
<div id="app">{{ html }}</div>
{% endautoescape %}

{% endblock %}

{% block scripts %}
  {% parent %}
  {% autoescape %}
    <script>window.__APP_INITIAL_STATE__ = {{initialState}};</script>
  {% endautoescape %}
  <div id="APP_STATE" style="display:none" data-state="{{initialState}}"></div>
  <script src={{Global.path('js/bundle.js')}}></script>
{% endblock %}
