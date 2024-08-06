const sidebarData = [
    {
        "title": "Profile",
        "content": "",
        "active": false,
        "subitems": [],
    },
    {
        "title": "Invoice",
        "content": "",
        "active": false,
        "subitems": [
            {
                "title": "Create New Invoice",
                "content": "",
                "active": false
            },
            {
                "title": "Draft Invoice",
                "content": "<h3>Draft Invoices</h3><p>This is the draft invoice content.</p>",
                "active": false
            },
            {
                "title": "Completed Invoice",
                "content": "<h3>Sent Invoices</h3><p>This is the sent invoices content.</p>",
                "active": false
            },
            {
                "title": "Edit Invoice",
                "content": "<h3>Sent Invoices</h3><p>This is the sent invoices content.</p>",
                "active": false
            },
            {
                "title": "Paid Invoice",
                "content": "<h3>Sent Invoices</h3><p>This is the sent invoices content.</p>",
                "active": false
            }
        ],
    },
    {
        "title": "Items",
        "content": "<h3>Items Page</h3><p>This is the items page content.</p>",
        "active": false,
        "subitems": [
            {
                "title": "Hourly Item",
                "content": "<h3>Hourly Item</h3><p>This is the hourly item content.</p>",
                "active": false
            },
            {
                "title": "Quantity Items",
                "content": "<h3>Quantity Items</h3><p>This is the quantity items content.</p>",
                "active": false
            },
            {
                "title": "Bulk Upload Items",
                "content": "<h3>Bulk Upload Items</h3><p>This is the bulk upload items content.</p>",
                "active": false
            }
        ],
    },
    {
        "title": "Client",
        "content": "<h3>Client Page</h3><p>This is the client page content.</p>",
        "active": false,
        "subitems": [
            {
                "title": "Add New Clients",
                "content": "<h3>Add New Clients</h3><p>This is the add new clients content.</p>",
                "active": false
            },
            {
                "title": "View Clients",
                "content": "<h3>View Clients</h3><p>This is the view clients content.</p>",
                "active": false
            }
        ],
    },
    {
        "title": "Transaction History",
        "content": "<h3>Transaction History Page</h3><p>This is the transaction history page content.</p>",
        "active": false,
        "subitems": [],
    },
    {
        "title": "Ledger",
        "content": "<h3>Ledger Page</h3><p>This is the ledger page content.</p>",
        "active": false,
        "subitems": [],
    },
    {
        "title": "Logout",
        "content": "",
        "active": false,
        "subitem": []
    }
];



// JavaScript/jQuery Code

// JSON response placeholder for dynamic data
let userProfile = {};
let originalProfileData = {};

$(document).ready(function () {
    function fetchUserProfile() {
        $.ajax({
            url: '/api/profile/',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                userProfile = data;
                originalProfileData = { ...userProfile };
                displayProfile();
            },
            error: function (xhr, status, error) {
                console.error('Error fetching user profile:', error);
            }
        });
    }

    function displayProfile() {
        const profileContent = `
        <h2 class="text-center content-header">Welcome To Your Profile</h2>
        <div class="profile-container">
            <div class="profile-details">
                <h3>${userProfile.name}</h3>
                <div class="contact-item"><h6>${userProfile.role}</h6></div>
            </div>
        </div>
        <div class="profile-container">
            <div class="profile-details">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Full Name:</label>
                            <span id="profile-fullname">${userProfile.name}</span>
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Email:</label>
                            <span id="profile-email-display">${userProfile.email}</span><br>
                            <button id="verifyEmail" class="btn btn-warning btn-sm">Verify Email</button>
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Phone:</label>
                            <span id="profile-phone">+91 ${userProfile.phone}</span><br>
                            <button id="verifyPhone" class="btn btn-warning btn-sm">Verify Mobile</button>
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Address:</label>
                            <span id="profile-address">${userProfile.address}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Date of Joining:</label>
                            <span id="profile-dob">${userProfile.joinedDate}</span>
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Occupation:</label>
                            <span id="profile-occupation">${userProfile.role}</span>
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Company:</label>
                            <span id="profile-company">${userProfile.company}</span>
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-weight-bold">Website:</label>
                            <span id="profile-website">${userProfile.website}</span>
                        </div>
                    </div>
                </div>
                <div class="text-left mt-3">
                    <button id="editProfileBtn" class="btn btn-primary">Edit Profile</button>
                </div>
            </div>
        </div>
        `;
        $('#mainContent').html(profileContent);

        $('#editProfileBtn').click(function () {
            openEditProfileModal();
        });
    }

    function openEditProfileModal() {
        originalProfileData = { ...userProfile };

        $('#editFullName').val(userProfile.name);
        $('#editEmail').val(userProfile.email);
        $('#editPhone').val(userProfile.phone);
        $('#editAddress').val(userProfile.address);
        $('#editRole').val(userProfile.role);
        $('#editCompany').val(userProfile.company);
        $('#editWebsite').val(userProfile.website);
        $('#editJoinedDate').val(userProfile.joinedDate);

        $('#editProfileModal').modal('show');
    }

    $('#editProfileForm').submit(function (event) {
        event.preventDefault();

        const updatedProfileData = {
            name: $('#editFullName').val(),
            email: $('#editEmail').val(),
            phone: $('#editPhone').val(),
            address: $('#editAddress').val(),
            role: $('#editRole').val(),
            company: $('#editCompany').val(),
            website: $('#editWebsite').val(),
            joinedDate: $('#editJoinedDate').val()
        };

        $.ajax({
            url: '/update_profile/',
            type: 'POST',
            data: JSON.stringify(updatedProfileData),
            contentType: 'application/json',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            success: function (response) {
                if (response.success) {
                    userProfile = updatedProfileData;
                    displayProfile();
                    $('#editProfileModal').modal('hide');
                } else {
                    alert('Failed to update profile. Please try again.');
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                alert('An error occurred while updating the profile.');
            }
        });
    });

    $('#resetProfileBtn').click(function () {
        resetProfileData();
    });

    function resetProfileData() {
        $('#editFullName').val(originalProfileData.name);
        $('#editEmail').val(originalProfileData.email);
        $('#editPhone').val(originalProfileData.phone);
        $('#editAddress').val(originalProfileData.address);
        $('#editRole').val(originalProfileData.role);
        $('#editCompany').val(originalProfileData.company);
        $('#editWebsite').val(originalProfileData.website);
        $('#editJoinedDate').val(originalProfileData.joinedDate);
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function populateSidebar(data) {
        const sidebarList = $('#sidebar ul.components');
        sidebarList.empty();

        data.forEach((item, index) => {
            const listItem = $('<li>').addClass(item.active ? 'active' : '');
            const link = $('<a>')
                .attr('href', '#')
                .text(item.title)
                .click(function (e) {
                    e.preventDefault();
                    if (item.title === "Profile") {
                        displayProfile();
                    } else {
                        displayContent(index);
                    }
                    updateActiveItem(index);
                    toggleSubmenu(item, $(this));
                });

            listItem.append(link);

            if (item.subitems && item.subitems.length > 0) {
                const submenu = $('<ul class="submenu">');
                item.subitems.forEach((subitem, subindex) => {
                    const sublistItem = $('<li>');
                    const sublink = $('<a>')
                        .attr('href', '#')
                        .text(subitem.title)
                        .click(function (e) {
                            e.preventDefault();
                            displaySubContent(index, subindex);
                            updateActiveSubItem(subindex);
                        });

                    sublistItem.append(sublink);
                    submenu.append(sublistItem);
                });
                listItem.append(submenu);
            }

            sidebarList.append(listItem);
        });
    }

    function updateActiveItem(activeIndex) {
        const sidebarItems = $('#sidebar ul.components > li');
        sidebarItems.removeClass('active');
        sidebarItems.eq(activeIndex).addClass('active');
    }

    function updateActiveSubItem(activeSubIndex) {
        const sidebarItems = $('#sidebar ul.components .submenu li');
        sidebarItems.removeClass('active');
        sidebarItems.eq(activeSubIndex).addClass('active');
    }

    function toggleSubmenu(item, link) {
        const submenu = link.next('.submenu');
        if (item.subitems && item.subitems.length > 0) {
            $('.submenu').not(submenu).slideUp();
            submenu.slideToggle();
        }
    }

    function displayContent(index) {
        const content = `
            <h2 class="text-center content-header">${sidebarData[index].title}</h2>
            <p>${sidebarData[index].content}</p>
        `;
        $('#mainContent').html(content);
    }

    function displaySubContent(index, subIndex) {
        const content = `
            <h2 class="text-center content-header">${sidebarData[index].subitems[subIndex].title}</h2>
            <p>${sidebarData[index].subitems[subIndex].content}</p>
        `;
        $('#mainContent').html(content);
    }

    populateSidebar(sidebarData);

    fetchUserProfile();
});