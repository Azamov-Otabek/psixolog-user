import { toast, ToastContainer } from "react-toastify";
import { Button, Form, Input, Radio, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../config";

function Login() {
  const [load, setLoadi] = useState(false);
  const [selectedLevelType, setSelectedLevelType] = useState<string | undefined>(undefined);
  const [selectedNation, setSelectedNation] = useState<string | undefined>(undefined);
  const [otherProfession, setOtherProfession] = useState<string | undefined>(undefined);
  const [otherNotion, setOtherNotion] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  async function handleSubmit(values: any) {
    setLoadi(true);
    values.working_experience = +values.working_experience;

    if (selectedLevelType === 'boshqa' && otherProfession) {
      values.level_type = otherProfession;
    }

    if(selectedNation === 'boshqa' && otherNotion){
      values.nation = otherNotion
    }

    localStorage.setItem('email', values?.email);
    try {
      const response = await http.post('/register', values);
      if (response?.status === 200) {
        toast.success("Muvaffaqiyatli ro'yhatdan o'tildi", {autoClose: 1200})
        setTimeout(() => {
          navigate('/');
        }, 1700);
      }
    } catch (err) {
      setLoadi(false);
    }
  }

  return (
    <>
      <ToastContainer />

      <div className="login">
        <div className="login-form" style={{ marginTop: 30 }}>
          <div className="login-title">
            <h1>Psixolog</h1>
          </div>

          <div className="login-body">
            <Form onFinish={(values) => handleSubmit(values)}>
              <p>Ismingiz</p>
              <FormItem
                name="name"
                hasFeedback
                rules={[
                  { required: true, message: "Ismingizni kiriting !" },
                ]}
              >
                <Input size="large" placeholder="Jasurbek" name="name" />
              </FormItem>

              <p>Familyangiz</p>
              <FormItem
                name="surname"
                hasFeedback
                rules={[
                  { required: true, message: "Familyangizni kiriting !" },
                ]}
              >
                <Input size="large" placeholder="Abdullayev" name="surname" />
              </FormItem>

                <p>Yoshingiz</p>
              <FormItem
                name="age"
                hasFeedback
                rules={[
                  { required: true, message: "Yoshingizni kiriting!" },
                ]}
                >
                <Select
                  virtual={false}
                  showSearch
                  placeholder="Select a age"
                  optionFilterProp="label"
                  options={[
                    { value: "15-20", label: "15-20" },
                    { value: "21-25", label: "21-25" },
                    { value: "26-30", label: "26-30" },
                    { value: "31-35", label: "31-35" },
                    { value: "36-40", label: "36-40" },
                    { value: "41-45", label: "41-45" },
                    { value: "46 va undan ortiq", label: "46 va undan ortiq" },
                  ]}
                />
              </FormItem>


              <p>Millatingiz</p>
              <FormItem
                name="nation"
                hasFeedback
                rules={[
                  { required: true, message: "Millatingizni kiriting !" },
                ]}
              >
                <Select
                 virtual={false}
                  showSearch
                  placeholder="Select a nation"
                  optionFilterProp="label"
                  value={selectedNation}
                  onChange={(value) => {
                    setSelectedNation(value);
                    if (value !== 'boshqa') {
                      setOtherProfession(undefined);
                    }
                  }}
                  options={[
                    { value: "Ozbek", label: "O'zbek" },
                    { value: "Tojik", label: "Tojik" },
                    { value: "Rus", label: "Rus" },
                    { value: "Ukarin", label: "Ukrain" },
                    { value: "Hind", label: "Hind" },
                    { value: "Turk", label: "Turk" },
                    { value: "Qozoq", label: "Qozoq" },
                    { value: "Qirgiz", label: "Qirg'iz" },
                    { value: "Koreys", label: "Koreys" },
                    { value: "Nemis", label: "Nemis" },
                  
                    { value: "boshqa", label: "Boshqa" }
                  ]}
                />
              </FormItem>
              {selectedNation === 'boshqa' && (
                <>
                  <p>Boshqa millat</p>
                  <FormItem
                    name="otherNotion"
                    hasFeedback
                    rules={[
                      { required: true, message: "Iltimos, boshqa millatni kiriting !" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Boshqa millatni kiriting"
                      name="other_notion"
                      value={otherNotion}
                      onChange={(e) => setOtherNotion(e.target.value)}
                    />
                  </FormItem>
                </>
              )}

              <p>Email</p>
              <FormItem
                name="email"
                hasFeedback
                rules={[
                  { type: "email", required: true, message: "Emailingizni to'g'ri formatda kiriting !" },
                ]}
              >
                <Input size="large" placeholder="jasurbek@mail.ru" name="email" />
              </FormItem>

              <p>Telefon raqamingiz</p>
              <FormItem
                name="phone_number"
                hasFeedback
                rules={[
                  { required: true, message: "Telefon raqamingizni kiriting !" },
                ]}
              >
                <Input size="large" placeholder="+998 ( 99 ) 999 99 99" name="phone_number" />
              </FormItem>

              <p>Kasbingiz</p>
              <FormItem
                name="level_type"
                hasFeedback
                rules={[
                  { required: true, message: "Darajangizni kiriting !" },
                ]}
              >
                <Select
                virtual={false}
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="label"
                  value={selectedLevelType}
                  onChange={(value) => {
                    setSelectedLevelType(value);
                    if (value !== 'boshqa') {
                      setOtherProfession(undefined);
                    }
                  }}
                  options={[
                    { value: "IT_junior", label: "IT mutaxassisi (Junior)" },
                    { value: "IT_middle", label: "IT mutaxassisi (Middle)" },
                    { value: "IT_senior", label: "IT mutaxassisi (Senior)" },
                    { value: "o'qituvchi", label: "O'qituvchi" },
                    { value: "talaba", label: "Talaba" },
                    { value: "tibbiyot", label: "Tibbiyot" },
                    { value: "iqtisod", label: "Iqtisod" },
                    { value: "phd va dsc", label: "Phd va Dsc" },
                    { value: "servis", label: "Servis" },
                    { value: "ishsiz", label: "Ishsiz" },
                    { value: "uybekasi", label: "Uybekasi" },
                    { value: "tadbirkorlik", label: "Tadbirkorlik" },
                    { value: "enjiner", label: "Enjiner" },
                    { value: "san'at", label: "San'at" },
                    { value: "boshqa", label: "Boshqa" }
                  ]}
                />
              </FormItem>

              {selectedLevelType === 'boshqa' && (
                <>
                  <p>Other Profession</p>
                  <FormItem
                    name="otherProfession"
                    hasFeedback
                    rules={[
                      { required: true, message: "Iltimos, boshqa kasbingizni kiriting !" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Boshqa kasbingizni kiriting"
                      name="other_profession"
                      value={otherProfession}
                      onChange={(e) => setOtherProfession(e.target.value)}
                    />
                  </FormItem>
                </>
              )}

              <p>Tajribangiz</p>
              <FormItem
                name="working_experience"
                hasFeedback
                rules={[
                  { required: true, message: "Tajribangizni kiriting ! (0 - 9 )" },
                ]}
              >
                <Input type="number" size="large" placeholder="(0 - 9 )" name="working_experience" />
              </FormItem>

              <p>Password</p>
              <FormItem
                name="password"
                hasFeedback
                rules={[
                  { required: true, message: "Iltimos parolingizni kiriting !" },
                  { min: 5, message: "Parolingiz 5 tadan kam bo'lmasin" },
                ]}
              >
                <Input.Password size="large" name="password" placeholder="password" />
              </FormItem>

              <p>Jinsingiz</p>
              <FormItem
                name="gender"
                hasFeedback
                rules={[
                  { required: true, message: "Jinsingizni kiriting !" },
                ]}
              >
                <Radio.Group>
                  <Radio value={'male'}>Erkak</Radio>
                  <Radio value={'female'}>Ayol</Radio>
                </Radio.Group>
              </FormItem>

              <FormItem>
                <Button loading={load} htmlType="submit" type="primary">
                  Submit
                </Button>
              </FormItem>

              <div className="login-tooltip"></div>

              <Link className="login-link" to={"/"}>
                Login
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
