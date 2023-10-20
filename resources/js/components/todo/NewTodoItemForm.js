import { Button, FormGroup, Input, Label } from "reactstrap"

const NewTodoItemForm = ({ title, updateTitle, description, updateDescription, handleAction }) => {
    return (
        <div className="row justify-content-center">
            <div className="col">
                <FormGroup>
                    <Label for="title">
                        Name
                    </Label>
                    <Input
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => updateTitle(e.target.value)}
                        placeholder="title"
                        autoComplete="off"
                        type="text"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="title">
                        Description
                    </Label>
                    <Input
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => updateDescription(e.target.value)}
                        placeholder="description"
                        autoComplete="off"
                        type="textarea"
                    />
                </FormGroup>
                <FormGroup className="d-flex justify-content-center">
                    <Button color="primary" className="col-md-6" onClick={handleAction}>Add todo item</Button>
                </FormGroup>
            </div>
        </div>
    );
};

export default NewTodoItemForm;
