let favUserList = [];
export class LocalStorage {

    setFavoriteUser = (user) => {
        const existingUser = favUserList.some((data) => data.id === user.id);
        if (!existingUser) {
            favUserList.push(user)
        }
        localStorage.setItem('favoriteUserList', JSON.stringify(favUserList));
    };

    removeFavoriteUser = (user) => {
        const removeUserList = favUserList.filter(x => x.id !== user.id);
        favUserList = removeUserList;
        localStorage.setItem('favoriteUserList', JSON.stringify(favUserList));
    };

    getFavoriteUserList = () => {
        const userList = localStorage.getItem('favoriteUserList');
        if (userList) {
            return JSON.parse(userList);
        }
        return [];
    };

}
