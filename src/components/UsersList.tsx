import { AxiosIntance } from "../shared";

interface user {
  id: string | number;
  name: string;
  email: string;
  position: string;
  setLoading: any;
}

const UsersList = (props: user) => {
  const handleResetClick = () => {
    AxiosIntance.delete(`/users/${props.id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => alert(err.data.data));
  };

  return (
    <tbody onClick={() => handleResetClick()}>
      <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.position}</td>
      </tr>
    </tbody>
  );
};

export default UsersList;
