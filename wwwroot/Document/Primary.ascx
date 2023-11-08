<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Primary.ascx.cs" Inherits="Areia6Areia6Theme.Primary" %>
<%@ Register TagPrefix="dnn" TagName="LOGO" Src="~/Admin/Skins/Logo.ascx" %>
<%@ Register TagPrefix="dnn" TagName="SEARCH" Src="~/Admin/Skins/Search.ascx" %>
<%@ Register TagPrefix="dnn" TagName="USER" Src="~/Admin/Skins/User.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LOGIN" Src="~/Admin/Skins/Login.ascx" %>
<%@ Register TagPrefix="dnn" TagName="PRIVACY" Src="~/Admin/Skins/Privacy.ascx" %>
<%@ Register TagPrefix="dnn" TagName="TERMS" Src="~/Admin/Skins/Terms.ascx" %>
<%@ Register TagPrefix="dnn" TagName="COPYRIGHT" Src="~/Admin/Skins/Copyright.ascx" %>
<%@ Register TagPrefix="dnn" TagName="JQUERY" Src="~/Admin/Skins/jQuery.ascx" %>
<%@ Register TagPrefix="dnn" TagName="META" Src="~/Admin/Skins/Meta.ascx" %>
<%@ Register TagPrefix="dnn" TagName="MENU" Src="~/DesktopModules/DDRMenu/Menu.ascx" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
          
<dnn:META ID="mobileScale" runat="server" Name="viewport" Content="width=device-width,initial-scale=1" />
<dnn:META ID="Mobile-first" Name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

<!-- add References jQuery -->
<dnn:JQUERY ID="JQUERY1" runat="server" jQueryHoverIntent="false" />
<dnn:DnnJsInclude ID="DnnJsInclude2" runat="server" FilePath="assets/vendor/MDB/js/jquery.min.js" PathNameAlias="SkinPath" Priority="2" />   

<!-- add fontawesome 5 -->  
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
<dnn:DnnCssInclude ID="PersianFont" runat="server" FilePath="assets/vendor/Fonts/css/PersianFont.css" PathNameAlias="SkinPath" Priority="10" />

<!-- add References Bootstrap core CSS -->
<dnn:DnnCssInclude ID="bootstrapCSS" runat="server" FilePath="assets/vendor/MDB/css/bootstrap.css" PathNameAlias="SkinPath" Priority="11" />
<dnn:DnnCssInclude ID="mdbcss" runat="server" FilePath="assets/vendor/MDB/css/mdb.min.css" PathNameAlias="SkinPath" Priority="12" />
<dnn:DnnJsInclude ID="popperJs" runat="server" FilePath="assets/vendor/MDB/js/popper.min.js" PathNameAlias="SkinPath" Priority="13" />
<dnn:DnnJsInclude ID="bootstrapBbundleJs" runat="server" FilePath="assets/vendor/bootstrap/js/bootstrap.bundle.js" PathNameAlias="SkinPath" Priority="14" />
<dnn:DnnJsInclude ID="mdbJs" runat="server" FilePath="assets/vendor/MDB/js/mdb.min.js" PathNameAlias="SkinPath" Priority="15" />

<!-- add References toastr message -->
<dnn:DnnCssInclude ID="toastrCSS" runat="server" FilePath="assets/vendor/Toastr/toastr.css" PathNameAlias="SkinPath" Priority="16" />
<dnn:DnnJsInclude ID="toastrJS" runat="server" FilePath="assets/vendor/Toastr/toastr.js" PathNameAlias="SkinPath" Priority="17" />

<!-- add References swiper -->
<dnn:DnnCssInclude ID="swiperCSS" runat="server" FilePath="assets/vendor/Swiper/swiper-bundle.css" PathNameAlias="SkinPath" Priority="18" />
<dnn:DnnJsInclude ID="swiperJS" runat="server" FilePath="assets/vendor/Swiper/swiper-bundle.js" PathNameAlias="SkinPath" Priority="19" />

<!-- add References Amcharts -->
<script type="text/javascript" src="https://cdn.amcharts.com/lib/4/core.js"></script>
<script type="text/javascript" src="https://cdn.amcharts.com/lib/4/charts.js"></script>
<script type="text/javascript" src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>

<!-- add References JS And Css Plus -->      
<link rel="stylesheet" href="https://region6.tehran.ir/Portals/0/MyBizTemplate/assets/Css/Rewrite.css">
<link rel="stylesheet" href="https://region6.tehran.ir/Portals/0/MyBizTemplate/assets/Css/photobox.css">

<!--Mapbox GL References-->
<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css" rel="stylesheet" />
<%--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js"></script>--%>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/1.12.0/mapbox-gl.js"></script>
<script src="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js"></script>
<!--Mapbox GL Draw Rectangle-->
<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.js'></script>
<dnn:DnnJsInclude ID="DnnJsInclude7" runat="server" FilePath="assets/js/mapbox-gl-draw-rectangle-mode.js" PathNameAlias="SkinPath" />   
<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css' type='text/css' />
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
<link href="https://region6.tehran.ir/Portals/0/DarkMap/CSS/weather.css" rel="stylesheet" />
<link href="https://region6.tehran.ir/Portals/0/MyBizTemplate/assets/Css/MapboxStyleV2.css" rel="stylesheet" />
<dnn:DnnJsInclude ID="DnnJsInclude1" runat="server" FilePath="assets/vendor/OsmToGeo/osmtogeojson.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude ID="DnnJsInclude6" runat="server" FilePath="assets/vendor/weather/moment.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude ID="DnnJsInclude3" runat="server" FilePath="assets/js/SourceData.js" PathNameAlias="SkinPath" />

<div id="main" class="MainPurePage">
    <!-- ======= About Section ======= -->
    <div id="ContentPane" runat="server"></div>
    <!-- End About Section -->  
</div>