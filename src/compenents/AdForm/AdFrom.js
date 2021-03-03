import React, { useState } from "react";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";

import classnames from "classnames";
import styles from "./AdForm.module.css";

const AdForm = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [showWarnings, setShowWarnings] = useState(false);
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfFiles, setNumberOfFiles] = useState(0);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onPrev = () => {
    toggle((Number(activeTab) - 1).toString());
    setShowNext(true);

    if (activeTab === "2") {
      setShowPrev(false);
    }
  };

  const onNext = () => {
    if (activeTab === "1" && !title) {
      setShowWarnings(true);
      return;
    }

    if (activeTab === "2" && !phone) {
      setShowWarnings(true);
      return;
    }

    if (activeTab === "3" && numberOfFiles > 5) {
      setShowWarnings(true);
      return;
    }

    setShowWarnings(false);
    toggle((Number(activeTab) + 1).toString());
    setShowPrev(true);

    if (activeTab === "3") {
      setShowNext(false);
    }
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const onFilesChange = (e) => {
    setNumberOfFiles(e.target.files.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);

    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.AdForm}>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === "1" })}>
            Основна інформація
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink className={classnames({ active: activeTab === "2" })}>
            Контакнта інформація
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink className={classnames({ active: activeTab === "3" })}>
            Фотографія
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink className={classnames({ active: activeTab === "4" })}>
            Публікація
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent className={styles.TabContent} activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="title">Заголовок</Label>
                <Input
                  onChange={onTitleChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Заголовок"
                  required
                />

                {showWarnings && (
                  <FormText className={styles.Warning} color="danger">
                    Введіть заголовок!
                  </FormText>
                )}
              </FormGroup>

              <FormGroup>
                <Label for="description">Опис</Label>
                <Input type="textarea" name="description" id="description" />
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Публікувати
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="phone">Номер</Label>
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Номер"
                  required
                  onChange={onPhoneChange}
                />

                {showWarnings && (
                  <FormText className={styles.Warning} color="danger">
                    Введіть номер!
                  </FormText>
                )}
              </FormGroup>

              <FormGroup>
                <Label for="phone">e-mail</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="e-mail"
                />
              </FormGroup>
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="file">Виберіть до 5 фото</Label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={onFilesChange}
                />
                {showWarnings && (
                  <FormText className={styles.Warning} color="danger">
                    Виберіть максимум 5 файлів!
                  </FormText>
                )}
              </FormGroup>
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Пакет-1
                </Label>
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Пакет-2
                </Label>
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Пакет-3
                </Label>
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Пакет-4
                </Label>
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Пакет-5
                </Label>
              </FormGroup>

              <Button type="submit">Зберегти</Button>
            </Col>
          </Row>
        </TabPane>
      </TabContent>

      {showPrev && <Button onClick={onPrev}>prev</Button>}
      {showNext && <Button onClick={onNext}>next</Button>}
    </Form>
  );
};

export default AdForm;
