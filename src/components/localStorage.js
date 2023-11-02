export const getGroups = () => {
    return JSON.parse(localStorage.getItem('selectedArray')) || [];
  };
  
  export const saveGroup = (group) => {
    const groups = getGroups();
    selectedArray.push(group);
    localStorage.setItem('groups', JSON.stringify(selectedArray));
  };
  
