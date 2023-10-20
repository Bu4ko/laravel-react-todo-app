import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, Button } from 'reactstrap'

const TodoListItem = ({ id, name, deleteList }) => {
    return (
        <li className="list-group-item mb-3">
            <Card>
                <CardBody>
                    <CardTitle tag="h5">
                        { name }
                    </CardTitle>
                    <div className="row">
                        <Link className="btn btn-primary col-md-6" to={`/lists/${id}`}>Open</Link>
                        <Button className="col-md-6" onClick={() => deleteList(id)}>
                            Delete list
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </li>
    );
};

export default TodoListItem;
