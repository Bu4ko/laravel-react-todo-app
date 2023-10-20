import { Button, FormGroup, Input, Label } from "reactstrap"

const NewTodoListItemForm = ({ value, updateText, handleAction }) => {
    return (
        <div className="row justify-content-center">
            <div className="col">
                <FormGroup>
                    <Label for="name">
                        Name
                    </Label>
                    <Input
                        id="list-name"
                        name="name"
                        value={value}
                        onChange={(e) => updateText(e.target.value)}
                        placeholder="name"
                        autoComplete="off"
                        type="text"
                    />
                </FormGroup>
                <FormGroup className="d-flex justify-content-center">
                    <Button color="primary" className="col-md-6" onClick={handleAction}>Add todo list</Button>
                </FormGroup>
            </div>
        </div>
    );
};

export default NewTodoListItemForm;
