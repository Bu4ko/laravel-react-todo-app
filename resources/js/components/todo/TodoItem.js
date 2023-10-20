import { Card, CardBody, CardTitle, Button, CardText } from "reactstrap";

const TodoItem = ({ id, title, description, status, toggleStatus, deleteItem }) => {
    return (
        <li className="list-group-item mb-3">
            <Card color={ status === 'not_complete' ? '' : 'success' }>
                <CardBody>
                    <CardTitle tag="h5">
                        { title }
                    </CardTitle>
                    <CardText>
                        { description }
                    </CardText>
                    <div className="row d-flex justify-content-around">
                        <Button className="col-md-5" color={ status === 'not_complete' ? 'success' : 'primary' } onClick={() => toggleStatus(id, status)}>
                            { status === 'not_complete' ? 'Mark completed' : 'Mark active' }
                        </Button>
                        <Button className="col-md-5" onClick={() => deleteItem(id)}>
                            Delete ToDo
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </li>
    );
};

export default TodoItem;
