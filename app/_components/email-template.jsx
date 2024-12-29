
// import {
//   Body,
//   Button,
//   Container,
//   Head,
//   Hr,
//   Html,
//   Img,
//   Preview,
//   Section,
//   Text,
// } from "@react-email/components";
// import * as React from "react";

// export const EmailTemplate = ({ body }) => (
//   <Html>
//     <Head />
//     <Preview>
//       The Ecommerce Platform For Yout Digital Products search now for your
//       future
//     </Preview>
//     <Body style={main}>
//       <Container style={container}>
//         {/* <Img
// 					src='https://res.cloudinary.com/ddfzikgiz/image/upload/v1704687428/itelm_ryakt_f_50_dqyqh_e31f29dc71.png'
// 					width="420"
// 					height="300"
// 					alt="Koala"
// 					style={logo}
// 				/> */}
//         <Text style={paragraph}>Hi {body.fullName},</Text>
//         <Text style={paragraph}>
//           Thank you purchasing on Loay Tech Ecommerce
//         </Text>
//         {body.cart.map((citem) => (
//           <Text style={paragraph}>
//             product name {citem.product.title} 
// 			{citem.product.price}

//           </Text>
		
//         ))}
//         <Text style={paragraph}>total order {Number(body.amount) / 100} $</Text>
//         <Section style={btnContainer}></Section>
//         <Text style={paragraph}>
//           Best,
//           <br />
//           loay elden
//         </Text>
//         <Hr style={hr} />
//         <Text style={footer}>Subscribe to loay elden</Text>
//       </Container>
//     </Body>
//   </Html>

// );

// const main = {
//   backgroundColor: "#ffffff",
//   fontFamily:
//     '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
// };

// const container = {
//   margin: "0 auto",
//   padding: "20px 0 48px",
// };

// const logo = {
//   margin: "0 auto",
// };

// const paragraph = {
//   fontSize: "16px",
//   lineHeight: "26px",
// };

// const btnContainer = {
//   textAlign: "center",
// };

// const productName = {

// };

// const hr = {
//   borderColor: "#cccccc",
//   margin: "20px 0",
// };

// const footer = {
//   color: "#8898aa",
//   fontSize: "12px",
// };
import {
	Html,
	Head,
	Preview,
	Body,
	Container,
	Section,
	Text,
	Img,
	Row,
	Column,
	Button,
	Hr,
  } from "@react-email/components";
export const EmailTemplate = ({ body }) => (
	<Html>
	  <Head />
	  <Preview>
		The Ecommerce Platform For Your Digital Products - Search Now for Your
		Future
	  </Preview>
	  <Body style={main}>
		<Container style={container}>
			 {/* <Img
						alt='logo-img'
						src='https://asset.cloudinary.com/dkxjdkpkz/0f542ead66728e92c2375eeda3b1ed33'
						style={logoImageStyle}
					  /> */}
		  <Text style={heading}>Hi {body.fullName},</Text>
		  <Text style={paragraph}>
			Thank you for purchasing from Loay Tech Ecommerce.
		  </Text>
		  <Section style={cartSection}>
			<Text style={subHeading}>Your Order:</Text>
			<table style={tableStyle} width="100%">
			  <thead>
				<tr>
				  <th style={tableHeaderStyle}>Image</th>
				  <th style={tableHeaderStyle}>Product</th>
				  <th style={tableHeaderStyle}>Quantity</th>
				  <th style={tableHeaderStyle}>Price</th>
				</tr>
			  </thead>
			  <tbody>
				{body.cart.map((citem, index) => (
				  <tr key={index}>
					<td style={tableCellStyle}>
					  <Img
						alt={citem.product.title}
						src={citem.product.banner.url}
						style={imageStyle}
					  />
					</td>
					<td style={tableCellStyle}>{citem.product.title}</td>
					<td style={tableCellStyle}>{citem.quantity}</td>
					{/* <td style={tableCellStyle}>{c}</td> */}
					<td style={tableCellStyle}>${citem.product.price}</td>
				  </tr>
				))}
			  </tbody>
			</table>
		  </Section>
		  <Text style={totalStyle}>
			Total Order: ${Number(body.amount) / 100}
		  </Text>
		  <Row style={buttonRow}>
			<Column align="center">
			  <Button
				style={checkoutButton}
				href="https://your-ecommerce-site.com/checkout"
			  >
				Checkout
			  </Button>
			</Column>
		  </Row>
		  <Text style={paragraph}>
			Best regards,
			<br />
			Loay Elden
		  </Text>
		  <Hr style={hr} />
		  <Text style={footer}>Subscribe to Loay Elden for updates</Text>
		</Container>
	  </Body>
	</Html>
  );
  
  // Styles
  const logoImageStyle= {width: "80px", height: "80px", objectFit: "cover",borderRadius:'20px' ,textAlign:'center'}
  const main = { fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" };
  const container = { maxWidth: "600px", margin: "auto", padding: "20px" };
  const heading = { fontSize: "20px", fontWeight: "bold", marginBottom: "20px" };
  const paragraph = { margin: "10px 0" };
  const cartSection = { marginTop: "20px" };
  const subHeading = { fontSize: "16px", fontWeight: "bold", marginBottom: "10px" };
  const tableStyle = { borderCollapse: "collapse", width: "100%" };
  const tableHeaderStyle = {
	textAlign: "left",
	padding: "10px",
	borderBottom: "2px solid #ddd",
  };
  const tableCellStyle = { padding: "10px", borderBottom: "1px solid #ddd",textAlign:'center' };
  const imageStyle = { width: "80px", height: "80px", objectFit: "contain",borderRadius:'20px' };
  const totalStyle = { fontWeight: "bold", marginTop: "20px" };
  const buttonRow = { marginTop: "20px" };
  const checkoutButton = {
	display: "inline-block",
	padding: "12px 20px",
	backgroundColor: "#4a90e2",
	color: "#fff",
	textDecoration: "none",
	borderRadius: "8px",
  };
  const hr = { border: "none", borderTop: "1px solid #ddd", margin: "20px 0" };
  const footer = { fontSize: "12px", color: "#888", textAlign: "center" }