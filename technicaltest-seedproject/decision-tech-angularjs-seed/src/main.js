import angular from 'angular';
var $ = require("jquery");

angular.module('app', []);

require('./components/home/home.component');
import './styles.scss';

$(function() {
    $('#menu').click(function() {
        $('#filterContainer').toggleClass('filterShow');
    })
})