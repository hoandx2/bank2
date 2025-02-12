(function($) {
    "use strict";
    
    // Variables declarations
    var $wrapper = $('.main-wrapper');
    var $pageWrapper = $('.page-wrapper');
    var $slimScrolls = $('.slimscroll');
    
    // Stick Sidebar
    if ($(window).width() > 767) {
        if($('.theiaStickySidebar').length > 0) {
            $('.theiaStickySidebar').theiaStickySidebar({
              // Settings
              additionalMarginTop: 30
            });
        }
    }

    // Sidebar
    var Sidemenu = function () {
        this.$menuItem = $('#sidebar-menu a');
    };

    function init() {
        var $this = Sidemenu;
        $('#sidebar-menu a').on('click', function (e) {
            if ($(this).parent().hasClass('submenu')) {
                e.preventDefault();
            }
            if (!$(this).hasClass('subdrop')) {
                $('ul', $(this).parents('ul:first')).slideUp(350);
                $('a', $(this).parents('ul:first')).removeClass('subdrop');
                $(this).next('ul').slideDown(350);
                $(this).addClass('subdrop');
            } else if ($(this).hasClass('subdrop')) {
                $(this).removeClass('subdrop');
                $(this).next('ul').slideUp(350);
            }
        });
        $('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
    }
    
    // Sidebar Initiate
    init();
    
    // Mobile menu sidebar overlay
    $('body').append('<div class="sidebar-overlay"></div>');
    $(document).on('click', '#mobile_btn', function () {
        $wrapper.toggleClass('slide-nav');
        $('.sidebar-overlay').toggleClass('opened');
        $('html').addClass('menu-opened');
        return false;
    });
    
    // Sidebar overlay
    $(".sidebar-overlay").on("click", function () {
        $wrapper.removeClass('slide-nav');
        $(".sidebar-overlay").removeClass("opened");
        $('html').removeClass('menu-opened');
    });

    // Page Content Height
    if ($('.page-wrapper').length > 0) {
        var height = $(window).height();
        $(".page-wrapper").css("min-height", height);
    }
    
    $(window).resize(function () {
        if ($('.page-wrapper').length > 0) {
            var height = $(window).height();
            $(".page-wrapper").css("min-height", height);
        }
    });

    // Xử lý chức năng liên quan đến user
    function handleUserLogin() {
        // Giả sử đã có dữ liệu người dùng từ backend
        const loggedInUser = {
            username: 'john_doe',
            role: 'admin'  // Phân quyền user
        };

        // Kiểm tra user đăng nhập và hiển thị thông tin
        $('#username-display').text(loggedInUser.username);
        $('#login-form').hide(); // Ẩn form đăng nhập
        $('#user-info').show();  // Hiển thị thông tin người dùng

        // Phân quyền theo role
        if (loggedInUser.role === 'admin') {
            $('#admin-menu').show();
        } else if (loggedInUser.role === 'employee') {
            $('#employee-menu').show();
        } else {
            $('#customer-menu').show();
        }
    }

    // Xử lý đăng nhập
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();

        // Gọi API để kiểm tra đăng nhập (giả sử có API backend)
        $.ajax({
            url: '/api/login',  // Thay thế URL API
            type: 'POST',
            data: { username, password },
            success: function (response) {
                if (response.success) {
                    handleUserLogin();  // Xử lý sau khi đăng nhập thành công
                } else {
                    alert('Login failed');
                }
            },
            error: function () {
                alert('Error in login');
            }
        });
    });

    // Xử lý đăng xuất
    $('#logout-btn').on('click', function () {
        // Gọi API đăng xuất
        $.ajax({
            url: '/api/logout',  // Thay thế URL API
            type: 'POST',
            success: function () {
                alert('Logged out');
                $('#login-form').show(); // Hiển thị lại form đăng nhập
                $('#user-info').hide();  // Ẩn thông tin user
                window.location.reload();
            },
            error: function () {
                alert('Logout failed');
            }
        });
    });

    // Mobile Menu
    $(document).on('click', '#open_msg_box', function() {
        $wrapper.toggleClass('open-msg-box');
        return false;
    });
    
    // Other existing code...

})(jQuery);
