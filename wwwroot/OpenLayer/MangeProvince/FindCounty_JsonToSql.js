$.ajax({
  type: "POST",
  url: "/AreaManagement/Find_Province/",
  data: {
    _areaId: '225444'    
  },
  dataType: "json",
  success: function (response) {
    //document.getElementById("loaderOSM").style.display = "none";
    console.log(response);
  },
  error: function (req, status, error) {
    document.getElementById("loaderOSM").style.display = "none";
    _ceartMessage("error", "اشکال از سرور", req + status + error);
  },
});
