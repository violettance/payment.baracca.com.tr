import React, { useState } from 'react';
import logo from './logo-black.png';
import './App.css';
import 'antd/dist/antd.css';
import { usePaymentInputs, PaymentInputsWrapper } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { css } from 'styled-components';
import { Form, Input, Typography, Statistic, Row, Col, Button, Layout, Modal, Breadcrumb } from 'antd';
const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const invoices = {
  1111: {
    company: 'Ultra Turizm',
    date: '01.04.2020',
    amount: 300,
    service: "Transfer:	Beijing Airport-Jen Beijing by Shangri-La / Alper Akar	5 Dec 2019"
  },
  2222: {
    company: 'Ultra Turizm',
    date: '31.03.2020',
    amount: 5000,
    service: "Transfer:	Beijing Airport-Jen Beijing by Shangri-La / Alper Akar	5 Dec 2019"
  },
  3333: {
    company: 'Ultra Turizm',
    date: '02.04.2020',
    amount: 1490,
    service: "Transfer:	Beijing Airport-Jen Beijing by Shangri-La / Alper Akar	5 Dec 2019"
  }
};

function App() {
  const [invoiceNo, setInvoiceNo] = useState('');
  const [fetchingInvoice, setFetchingInvoice] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalPrivacy, setModalPrivacy] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleChangeCardNumber = e => setCardNumber(e.target.value);
  const handleChangeExpiryDate = e => setExpiryDate(e.target.value);
  const handleChangeCVC = e => setCvc(e.target.value);

  const {
    getCardNumberProps,
    getCardImageProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps
  } = usePaymentInputs();

  return (<Layout className="layout">
    <header className="App-header">
      <div className="logo-container">
        <img src={logo} className="App-logo" alt="logo" />
        <Title level={2} style={{ color: '#9b312b' }}>
          payment
          </Title>
      </div>
    </header>

    <Content style={{ padding: '0 50px' }}>

      <div className="content">
        <Form>
          <Form.Item
            hasFeedback
            validateStatus={
              fetchingInvoice
                ? 'validating'
                : invoice === false
                  ? 'error'
                  : undefined
            }
            help={invoice === false ? 'Invoice not found!' : undefined}
          >
            <Input
              size="large"
              type="text"
              name="invoice"
              placeholder="Please enter your invoice number"
              disabled={fetchingInvoice}
              value={invoiceNo}
              onChange={e => {
                const {
                  target: { value }
                } = e;

                setInvoiceNo(value);

                if (value.length >= 4) {
                  setFetchingInvoice(true);

                  sleep(2000).then(() => {
                    const invoice = invoices[value];
                    setFetchingInvoice(false);
                    if (invoice) setInvoice(invoice);
                    else setInvoice(false);
                  });
                }
              }}
            />
          </Form.Item>
        </Form>

        {invoice && (
          <div>
            <Row>
              <Col span={9}>
                <Statistic title="Date" value={invoice.date} />
              </Col>
           
              <Col span={15}>
                <Statistic title="Service" valueStyle={{fontSize: "17px"}} value={invoice.service} />
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col span={10}>
                <Statistic title="Company" value={invoice.company} />
              </Col>
              <Col span={9}>
                <Statistic
                  title="Amount (EUR)"
                  value={invoice.amount}
                  precision={2}
                />
              </Col>
              <Col span={5}>
                <Statistic
                  title="Amount (TRY)"
                  value={invoice.amount * 7.5}
                  precision={2}
                />
              </Col>
            </Row>
            <Row>


              <PaymentInputsWrapper
                {...wrapperProps}
                styles={{
                  fieldWrapper: {
                    base: css`
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                  `
                  },
                  inputWrapper: {
                    base: css`
                    border-color: green;
                  `,
                    errored: css`
                    border-color: maroon;
                  `,
                    focused: css`
                    border-color: unset;
                    box-shadow: unset;
                    outline: 2px solid blue;
                    outline-offset: 2px;
                  `
                  },
                  input: {
                    base: css`
                    color: green;
                  `,
                    errored: css`
                    color: maroon;
                  `,
                    cardNumber: css`
                    width: 16rem;
                  `,
                    expiryDate: css`
                    width: 8rem;
                  `,
                    cvc: css`
                    width: 5rem;
                  `
                  },
                  errorText: {
                    base: css`
                    color: maroon;
                  `
                  }
                }}
              >
                <svg {...getCardImageProps({ images })} />
                <input
                  {...getCardNumberProps({ onChange: handleChangeCardNumber })}
                  value={cardNumber}
                />

                <input
                  {...getExpiryDateProps({ onChange: handleChangeExpiryDate })}
                  value={expiryDate}
                />
                <input
                  {...getCVCProps({ onChange: handleChangeCVC })}
                  value={cvc}
                />
              </PaymentInputsWrapper>
            </Row>
            <Row>
              <Col xs={{ span: 8, offset: 4 }} lg={{ span: 4, offset: 8 }}>
                <Button size="large" style={{ marginTop: 16 }} type="primary" shape="round">
                  Pay ( {invoice.amount * 7.5}₺ )
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </Content>
    <Footer style={{ right: '0px', left: '0px', bottom: '0px', position: 'fixed', textAlign: 'center' }}>
      <br />Baracca Turizm ve Ticaret Limited Şirketi©2020
      <Button type="link" onClick={() => setModal(true)} >Gizlilik Sözleşmesi</Button>
      <Button type="link" onClick={() => setModalPrivacy(true)} >İptal ve İade Koşulları</Button>
      <p style={{textDecoration:'underline'}}>CONTACT</p>
      <p>
        Address: 8-10D AND Plaza Atasehir, Istanbul, TR
        Email: booking@baracca.com.tr
        Phone: +90 (216) 706 39 36
      </p>
    </Footer>
    <Modal
      title="GİZLİLİK VE GÜVENLİK POLİTİKASI"
      visible={modal}
      footer={null}
      onCancel={() => setModal(false)}
    >
      <p> Firmamız, çeşitli amaçlarla kişisel veriler toplayabilir. Aşağıda, toplanan kişisel verilerin nasıl ve ne şekilde toplandığı, bu verilerin nasıl ve ne şekilde korunduğu belirtilmiştir.

      İnternet sitemiz üzerindeki çeşitli form ve anketlerin doldurulması suretiyle üyelerin kendileriyle ilgili bir takım kişisel bilgileri (isim-soy isim, firma bilgileri, telefon, adres veya e-posta adresleri gibi) firmamız tarafından işin doğası gereği toplanmaktadır.

      Firmamız bazı dönemlerde müşterilerine ve üyelerine kampanya bilgileri, yeni ürünler hakkında bilgiler, promosyon teklifleri gönderebilir. Üyelerimiz bu gibi bilgileri alıp almama konusunda her türlü seçimi üye olurken yapabilir, sonrasında üye girişi yaptıktan sonra hesap bilgileri bölümünden bu seçimi değiştirilebilir ya da kendisine gelen bilgilendirme iletisindeki linkle bildirim yapabilir.

      Eposta ile gerçekleştirilen onay sürecinde, üyelerimiz tarafından firmamıza elektronik ortamdan iletilen kişisel bilgiler, üyelerimiz ile yaptığımız "Kullanıcı Sözleşmesi" ile belirlenen amaçlar ve kapsam dışında üçüncü kişilere açıklanmayacaktır.

      Sistemle ilgili sorunların tanımlanması ve verilen hizmet ile ilgili çıkabilecek sorunların veya uyuşmazlıkların hızla çözülmesi için, firmamız, üyelerinin IP adresini kaydetmekte ve bunu kullanmaktadır. IP adresleri, kullanıcıları genel bir şekilde tanımlamak ve kapsamlı demografik bilgi toplamak amacıyla da kullanılabilir.

      Firmamız, kişisel bilgileri gerektiğinde kullanıcıyla temas kurmak için kullanılabilir.

      Firmamız, gizli bilgileri kesinlikle özel ve gizli tutmayı, bunu bir sır saklama yükümü olarak addetmeyi ve gizliliğin sağlanması ve sürdürülmesi, gizli bilginin tamamının veya herhangi bir kısmının kamu alanına girmesini veya yetkisiz kullanımını veya üçüncü bir kişiye ifşasını önlemek için gerekli tüm tedbirleri almayı ve gerekli özeni göstermeyi taahhüt etmektedir.
      
<br />KREDİ KARTI GÜVENLİĞİ<br />

Firmamız, sitemiz üzerinden alınan hizmet dahilinde kredi kartı sahiplerinin güvenliğini ilk planda tutmaktadır. Kredi kartı bilgileriniz hiçbir şekilde sistemimizde saklanmamaktadır.

İşlemler sürecine girdiğinizde güvenli bir sitede olduğunuzu anlamak için dikkat etmeniz gereken iki şey vardır. Bunlardan biri tarayıcınızın en alt satırında bulunan bir anahtar ya da kilit simgesidir. Bu güvenli bir internet sayfasında olduğunuzu gösterir ve her türlü bilgileriniz şifrelenerek korunur. Bu bilgiler, ancak satış işlemleri sürecine bağlı olarak ve verdiğiniz talimat istikametinde kullanılır. Alışveriş sırasında kullanılan kredi kartı ile ilgili bilgiler alışveriş sitelerimizden bağımsız olarak 128 bit SSL (Secure Sockets Layer) protokolü ile şifrelenip sorgulanmak üzere ilgili bankaya ulaştırılır. Kartın kullanılabilirliği onaylandığı takdirde alışverişe devam edilir. Kartla ilgili hiçbir bilgi tarafımızdan görüntülenemediğinden ve kaydedilmediğinden, üçüncü şahısların herhangi bir koşulda bu bilgileri ele geçirmesi engellenmiş olur.
Online olarak kredi kartı ile verilen siparişlerin ödeme/fatura/teslimat adresi bilgilerinin güvenilirliği firmamız tarafından Kredi Kartları Dolandırıcılığı'na karşı denetlenmektedir. Bu yüzden, sitemizden ilk defa hizmet satın alan müşterilerimizin tedarik ve teslimat aşamasına gelebilmesi için öncelikle finansal ve adres/telefon bilgilerinin doğruluğunun onaylanması gereklidir. Bu bilgilerin kontrolü için gerekirse kredi kartı sahibi müşteri ile veya ilgili banka ile irtibata geçilmektedir.
Üye olurken verdiğiniz tüm bilgilere sadece siz ulaşabilir ve siz değiştirebilirsiniz. Üye giriş bilgilerinizi güvenli koruduğunuz takdirde başkalarının sizinle ilgili bilgilere ulaşması ve bunları değiştirmesi mümkün değildir. Bu amaçla, üyelik işlemleri sırasında 128 bit SSL güvenlik alanı içinde hareket edilir. Bu sistem kırılması mümkün olmayan bir uluslararası bir şifreleme standardıdır.

Not: Müşteriler tarafından bir hizmet satın alınacak olan firmanın açık adresinin ve telefonun yer almasına dikkat edilmesini tavsiye ediyoruz. İnternet sitesi üzerinden bir hizmet satın alacaksanız öncelikle bütün telefon / adres bilgilerini not edin. Eğer güvenmiyorsanız alışverişten önce telefon ederek teyit edin. Firmamıza ait dair tüm bilgiler ve firma yeri burada belirtilmiştir.



<br />ÜÇÜNCÜ TARAF WEB SİTELERİ VE UYGULAMALAR<br />

Firmamız,  web sitesi dahilinde başka sitelere link verebilir. Firmamız, bu linkler vasıtasıyla erişilen sitelerin gizlilik uygulamaları ve içeriklerine yönelik herhangi bir sorumluluk taşımamaktadır. Firmamıza ait sitede yayınlanan reklamlar, reklamcılık yapan iş ortaklarımız aracılığı ile kullanıcılarımıza dağıtılır. İş bu sözleşmedeki Gizlilik Politikası Prensipleri, sadece Mağazamızın kullanımına ilişkindir, üçüncü taraf web sitelerini kapsamaz.

<br />İSTİSNAİ HALLER<br />
Aşağıda belirtilen sınırlı hallerde Firmamız, işbu "Gizlilik Politikası" hükümleri dışında kullanıcılara ait bilgileri üçüncü kişilere açıklayabilir. Bu durumlar sınırlı sayıda olmak üzere;
1.Kanun, Kanun Hükmünde Kararname, Yönetmelik v.b. yetkili hukuki otorite tarafından çıkarılan ve yürürlülükte olan hukuk kurallarının getirdiği zorunluluklara uymak;
2.Yetkili idari ve adli otorite tarafından usulüne göre yürütülen bir araştırma veya soruşturmanın yürütümü amacıyla kullanıcılarla ilgili bilgi talep edilmesi;
3.Kullanıcıların hakları veya güvenliklerini korumak için bilgi vermenin gerekli olduğu hallerdir.

<br />E-POSTA GÜVENLİĞİ<br />
Firmamızın müşteri hizmetleri için kullanılan mail adresine herhangi bir siparişinizle ilgili olarak göndereceğiniz e-postalarda, asla kredi kartı numaranızı veya şifrelerinizi yazmayınız. E-postalarda yer alan bilgiler üçüncü şahıslar tarafından görülebilir. Firmamız e-postalarınızdan aktarılan bilgilerin güvenliğini hiçbir koşulda garanti edemez.

<br />TARAYICI ÇEREZLERİ<br />
Firmamız, sitemizi ziyaret eden kullanıcılar ve kullanıcıların web sitesini kullanımı hakkındaki bilgileri teknik bir iletişim dosyası (Çerez-Cookie) kullanarak elde edebilir. Bahsi geçen teknik iletişim dosyaları, ana bellekte saklanmak üzere bir internet sitesinin kullanıcının tarayıcısına (browser) gönderdiği küçük metin dosyalarıdır. Teknik iletişim dosyası site hakkında durum ve tercihleri saklayarak İnternet'in kullanımını kolaylaştırır.

Teknik iletişim dosyası,  siteyi kaç kişinin ziyaret ettiğini, bir kişinin siteyi hangi amaçla, kaç kez ziyaret ettiğini ve ne kadar sitede kaldıkları hakkında istatistiksel bilgileri elde etmeye ve kullanıcılar için özel tasarlanmış kullanıcı sayfalarından  dinamik olarak reklam ve içerik üretilmesine yardımcı olur. Teknik iletişim dosyası, ana bellekte veya e-postanızdan veri veya başkaca herhangi bir kişisel bilgi almak için tasarlanmamıştır. Tarayıcıların pek çoğu başta teknik iletişim dosyasını kabul eder biçimde tasarlanmıştır ancak kullanıcılar dilerse teknik iletişim dosyasının gelmemesi veya teknik iletişim dosyasının gönderildiğinde uyarı verilmesini sağlayacak biçimde ayarları değiştirebilirler.

Firmamız, işbu "Gizlilik Politikası" hükümlerini dilediği zaman sitede yayınlamak veya kullanıcılara elektronik posta göndermek veya sitesinde yayınlamak suretiyle değiştirebilir. Gizlilik Politikası hükümleri değiştiği takdirde, yayınlandığı tarihte yürürlük kazanır.

Gizlilik politikamız ile ilgili her türlü soru ve önerileriniz için info@baracca.com.tr adresine email gönderebilirsiniz. Firmamıza ait aşağıdaki iletişim bilgilerinden ulaşabilirsiniz.
<br />
Firma Ünvanı: Baracca Turizm ve Ticaret Limited Şirketi<br />
Adres: 8-10D AND Plaza Atasehir, Istanbul, TR<br />
Eposta: booking@baracca.com.tr<br />
Tel: +90 (216) 706 39 36<br />
      </p>

    </Modal>
    <Modal
      title="İPTAL VE İADE POLİTİKASI"
      visible={modalPrivacy}
      footer={null}
      onCancel={() => setModalPrivacy(false)}
    >
      <p> Baracca Turizm ve Ticaret Ltd. Şti.'den satın aldığınız hizmetin iade koşullarına uyması için, hizmetin "ayıplı hizmet" sayılması gerekmektedir. Kullanıcı tarafından hizmet sunumunda belirtilen kullanım şartları ile hizmet alma yönündeki talimatlara uyulmaması durumunda ve hizmete ait önceden belirtilen eksiklikler veya uyarılar durumunda hizmetin "ayıplı hizmet” olarak sayılmayacağının bilinmesi gerekir. Kullanım şartlarına uyulmaması, hizmet alımına ilişkin talimatlara göre kullanılmaması gibi sebeplerden kaynaklanan iade talepleri kabul edilmemektedir. Satın almış olduğunuz hizmet/ler ile ilgili şu konulara lütfen dikkat ediniz: Müşteri memnuniyetine dair hassasiyetimiz ve ilgili yasalar gereği, satın almış olduğunuz hizmet/leri neden belirtmeksizin iptal yada iade edebilirsiniz. İşlemlerinize başlanmasından sonra iptal ve iade talepleriniz geçerli olamayacaktır. Hizmetin, Baracca Turizm ve Ticaret Ltd. Şti. tarafından ayıplı ifası söz konusu olduğundaki iade hakkınız ayrıktır.  <br />Önemli Not<br />   Hizmetin, Baracca Turizm ve Ticaret Ltd. Şti. tarafından ayıplı ifası söz konusu olduğunda ise işlem tarihinden itibaren 7 gün içinde tarafımıza bildirim yapılması halinde, tarafınıza fatura kesilmeden ücret iadesi yapılacaktır. Faturalarımız, e-fatura olarak hizmet alımını takip eden 7 gün içinde kesildiğinden, hizmet alımını takiben 7 günlük süre içerisinde yapacağınız bildirimlerde ücret iadesi yapılarak fatura kesilmeyecektir. Bu süreden sonra yapılan bildirimlerde iade söz konusu olamayacaktır.   <br />Para İadesi ve Şartları<br />   Hizmetlerin bizden kaynaklanan nedenlerle ayıplı yerine getirilmesi halinde (yukarıdaki maddede de belirtildiği şekilde) hizmet tutarının iadesi, tarafımıza iletişim kanallarımızdan hizmet alımını takip eden 7 gün içinde bildirim yaptığınız gün işleme alınır. Para iadesinin hesabınıza yansıma süresi, bankanızın inisiyatifindedir. Satın alma aşamasında havale ile gerçekleştirilen ödemelerin iadesi ise en geç 1 hafta içerisinde müşteri hesabına yansımaktadır. Yaptığınız ödeme şekli ne ise (havale/eft yada kredi kartı) aynı yolla para iadesi alabileceksiniz. Tarafınıza tanımlanan bonuslardan kulanılmak suretiyle alınan hizmetlerde ücret iadesi söz konusu değildir. </p>
    </Modal>

  </Layout>)

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" />
          <Title level={2} style={{ color: '#9b312b' }}>
            payment
          </Title>
        </div>
      </header>

    </div>
  );
}

export default App;
