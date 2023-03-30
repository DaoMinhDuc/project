listProduct = [];

function getListItem() {
    $("#list-items").empty();
    $.get('https://641c5051b556e431a86b4511.mockapi.io/phone', function(listItemStorage, status) {
        for (let i = 0; i < listItemStorage.length; i++) {
            var item = listItemStorage[i];
            $("#list-items").append(`<tr>
            <td>${item.id}</td> 
            <td>${item.Name}</td> 
            <td>${item.Price}</td> 
            <td>${item.info}</td>
            <td>${item.Detail}</td>
            <td>${item.Star}</td>
            <td>${item.img}</td>
            <td>${item.NSX}</td>
            <td>${item.Category}</td>
            <td><button onclick="openEditModal(${item.id})" type="button" class="btn btn-warning open-modal">Edit</button> </td> 
             <td><button onclick="removeItem(${item.id})" type="button" class ="btn btn-danger open-modal">Remove</button> </td> 
            </tr>`);
        }
    })
};


function openEditModal(id) {
    $.get(`https://641c5051b556e431a86b4511.mockapi.io/Projects/phone/${id}`, function(itemChoice, status) {

        $('#Name').val(itemChoice.Name);
        $('#Price').val(itemChoice.Price);
        $('#info').val(itemChoice.info);
        $('#Detail').val(itemChoice.Detail);
        $('#Star').val(itemChoice.Star);
        $('#img').val(itemChoice.img);
        $('#NSX').val(itemChoice.NSX);
        $('#Category').val(itemChoice.Category);
        $('#myModal').show();
        localStorage.setItem('idEditing', id);
    })

}

function removeItem(id) {
    $.ajax({
        url: `https://641c5051b556e431a86b4511.mockapi.io/Projects/phone/${id}`,
        method: 'DELETE',
        success: function(res) {
            getListItem();
        }
    })
}

$(document).ready(function() {
    getListItem();

    function resetForm() {
        $('#Name').val('');
        $('#Price').val('');
        $('#info').val('');
        $('#Detail').val('');
        $('#Star').val('');
        $('#img').val('');
        $('#NSX').val('');
        $('#Category').val('');
    }

    $('#myModal').hide();
    $(".open-modal").click(function() {
        $('#myModal').show();
    })
    $('.close').click(function() {
        $('#myModal').hide();
    });

    $('.add-new-button').click(function() {
        var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];

        var v_Name = $("#Name").val();
        var v_Price = $("#Price").val();
        var v_Info = $("#Info").val();
        var v_Detail = $("#Detail").val();
        var v_Star = $("#Star").val();
        var v_Image = $("#Image").val();
        var v_Manufacturer = $("#Manufacturer").val();
        var v_Category = $("#Category").val();
        var itemData = {

            name: v_Name,
            price: v_Price,
            info: v_Info,
            detail: v_Detail,
            ratingStar: v_Star,
            imageName: v_Image,
            manufacturerId: v_Manufacturer,
            category: v_Category,
            id: listItemStorage.length + 1
        }
        $('#myModal').hide();
        listItemStorage.push(itemData);
        localStorage.setItem('listItem', JSON.stringify(listItemStorage));
        getListItem();
        resetForm();
    })

    $('.submit-button').click(function() {
        var idEditing = localStorage.getItem('idEditing');

        var v_Name = $("#Name").val();
        var v_Price = $("#Price").val();
        var v_Info = $("#Info").val();
        var v_Detail = $("#Detail").val();
        var v_Star = $("#Star").val();
        var v_Image = $("#Image").val();
        var v_Manufacturer = $("#Manufacturer").val();
        var v_Category = $("#Category").val();
        var itemData = {
            name: v_Name,
            price: v_Price,
            info: v_Info,
            detail: v_Detail,
            ratingStar: v_Star,
            imageName: v_Image,
            manufacturer: v_Manufacturer,
            category: v_Category,
        }
        if (idEditing) {
            $.ajax({
                url: `https://641c5051b556e431a86b4511.mockapi.io/Projects/phone/${idEditing}`,
                method: 'PUT',
                data: itemData,
                success: function(res) {
                    getListItem();
                    localStorage.removeItem('idEditing');
                    console.log(res)
                }
            })
        } else {
            $.ajax({
                url: 'https://641c5051b556e431a86b4511.mockapi.io/Projects/phone',
                method: 'POST',
                data: itemData,
                success: function(res) {
                    getListItem();
                    console.log(res)
                }
            })
        }
        resetForm();
    })
})


//search
// $(".search-button").click(function() {
//     var value_search = $(".search-input").val().trim().toLowerCase();
//     var count = 0

//     $.get('https://641c5051b556e431a86b4511.mockapi.io/Projects/phone', function(listItem, status) {
//         $(".list-items").empty();
//         for (let i = 0; i < listItem.length; i++) {
//             var item = listItem[i]
//             var search = item.Name.toLowerCase().search(value_search)
//             if (search !== -1) {
//                 count += 1;
//                 $(".product").append(`<tr>
//                     <td>${item.Id}</td>
//                     <td>${item.Name}</td>
//                     <td>${item.Price}</td>
//                     <td>${item.info}</td>
//                     <td>${item.Detail}</td>
//                     <td>${item.Star}</td>
//                     <td><img class="image-content" src="${item.img}"/></td>
//                     <td>${item.NSX}</td>
//                     <td>${item.Category}</td>

//                     <td>
//                         <button onclick="openEditModal(${item.id})" type="button" class="btn btn-primary">Edit</button>
//                         <button onclick="removeItem(${item.id})" type="button" class="btn btn-warning">Remove</button>
//                     </td>
//                 </tr>`);
//             }
//         }
//         if (count === 0 || value_search == "") {
//             alert("no result");
//             getListItem();
//         }
//     });
// });

// function handleCreateNewProduct(params) {
//     // alert("Create New!!");
//     // Lấy dữ liệu từ các ô Input
//     var v_Id = $("#Id").val();
//     var v_Name = $("#Name").val();
//     var v_Price = $("#Price").val();
//     var v_Info = $("#Info").val();
//     var v_Detail = $("#Detail").val();
//     var v_Star = $("#Star").val();
//     // Gọi hàm để lấy tên Ảnh
//     var v_Image = $("#Image").val();
//     var v_Manufacturer = $("#Manufacturer").val();
//     var v_Category = $("#Category").val();

//     // Tạo đối tượng ProductNew để lưu trữ
//     var ProductNew = {
//         id: v_Id,
//         name: v_Name,
//         price: v_Price,
//         info: v_Info,
//         detail: v_Detail,
//         ratingStar: v_Star,
//         imageName: v_Image,
//         manufacturerId: v_Manufacturer,
//         categoryId: v_Category,
//     };
//     // console.log("ProductNew: ", ProductNew);

//     // Add thêm sản phẩm vào listProduct
//     listProduct.push(ProductNew);
//     // Lưu dữ liệu localStorage
//     localStorage.setItem("listProduct", JSON.stringify(listProduct));
//     // Thực hiện Reset Form
//     // Gọi hàm hiển thị lại danh sách sản phẩm

// }

// // Hàm Load dữ liệu Product, sau đó đổ dữ liệu vào Table
// function fetchListProductAdmin(params) {
//     // Reset lại listProduct về Null
//     listProduct = [];

//     //Lấy dữ liệu từ LocalStorage để sử dụng
//     // Kiểm tra xem có dữ liệu dưới LocalStorage không
//     if (localStorage && localStorage.getItem("listProduct")) {
//         var listProductLocalStorage = JSON.parse(localStorage.getItem("listProduct"));
//         // Lưu dữ liệu từ localStorage vào listProduct trong JS để sử dụng
//         listProduct = listProductLocalStorage;
//     }