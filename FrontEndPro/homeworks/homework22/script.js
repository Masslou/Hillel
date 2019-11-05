$(function () {
    const USERS_URL = 'https://api.github.com/search/users?q=';

    const $userInformationTemplate = $('#user-information-template').html();
    const $userDetailsWrapper = $('#user-details-wrapper');
    const $usersSearchInput = $('.search-user-input');

    searchUser(USERS_URL);

    function searchUser(url) {
        $usersSearchInput.autocomplete({
            minLength: 2,
            messages: {
                noResults: 'no results',
            },
            select: function (event, ui) {
                $.get(ui.item.url, function (data) {
                    showUserInformation(data)
                })
            },
            source: function (request, response) {
                $.ajax({
                    url: `${url}${request.term}`,
                    success: function (result) {
                        const gitHubResponse = result.items.map((item) => {
                            return {
                                label: item.login,
                                url: item.url
                            }
                        });
                        response(gitHubResponse);
                    }
                });
            }
        });
    }

    function showUserInformation(data) {
        renderUserInformation(generateUserInformation(data));
    }

    function generateUserInformation(data) {
        return $userInformationTemplate.replace('{{userPhoto}}', data.avatar_url)
            .replace('{{username}}', data.name)
            .replace('{{userURL}}', data.html_url)
            .replace('{{userNickName}}', data.login)
            .replace('{{repositories}}', data.public_repos)
            .replace('{{registrationDate}}', generateDate(data.created_at))
            .replace('{{followers}}', data.followers);
    }

    function renderUserInformation(data) {
        return $userDetailsWrapper.html(data);
    }

    function generateDate(date) {
        date = new Date();
        return date.toLocaleDateString();
    }

});

