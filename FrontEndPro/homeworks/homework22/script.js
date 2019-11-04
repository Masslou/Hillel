$(function () {
    const usersUrl = 'https://api.github.com/search/users?q=';
    searchUser(usersUrl);
});

function searchUser(url) {
    $(".search-user-input").autocomplete({
        minLength: 2,
        messages: {
            noResults: 'no results',
        },
            select: function (event, ui) {
                fetch(ui.item.url).then(response => {
                    return response.json()
                }).then(data => {
                    renderUserDetails(generateUserDetails(data));
                })
        },

        source: function (request, response) {
            $.ajax({
                url: `${url}${request.term}`,
                success: function (result) {
                    const gitHubResponse = result.items.map((item) => {
                        return {label: item.login, data: item}
                    });
                    response(gitHubResponse);
                }
            });
        }
    });
}

function userInformationRender() {

}

function generateDate(date) {
    date = new Date();

}
