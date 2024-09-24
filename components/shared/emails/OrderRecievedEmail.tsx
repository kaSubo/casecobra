import { ShippingAddress } from '@prisma/client';
import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Text,
} from '@react-email/components';
import React from 'react';

interface Props {
	shippingAddress: {
		name: string;
		city: string;
		country: string;
		postalCode: string;
		street: string;
		state?: string | null;
	};
	orderId: string;
	orderDate: string;
}

export const OrderRecievedEmail: React.FC<Props> = ({
	shippingAddress,
	orderId,
	orderDate,
}) => {
	const baseUrl =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000' 
			: 'https://casecobra-theta-beryl.vercel.app';

	return (
		<Html>
			<Head />
			<Preview>Your order summary and estimated delivery date</Preview>
			<Body
				style={{
					backgroundColor: '#fff',
					fontFamily:
						'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
				}}>
				<Container
					style={{
						margin: '10px auto',
						width: '600px',
						maxWidth: '100%',
						border: '1px solid #E5E5E5',
					}}>
					<Section style={{ padding: '40px 74px', textAlign: 'center' }}>
						<Img
							src={`${baseUrl}/snake-3.png}`}
							width='65'
							height='73'
							alt='delivery snake'
							style={{ margin: 'auto' }}
						/>
						<Heading
							style={{
								fontSize: '32px',
								lineHeight: '1.3',
								fontWeight: '700',
								textAlign: 'center',
								letterSpacing: '-1px',
							}}>
							Thank you for your order!
						</Heading>
						<Text
							style={{
								margin: '0',
								lineHeight: '2',
								color: '#747474',
								fontWeight: '500',
							}}>
							We&apos;re preparign everything for delivery and will notify you once your
							package has been shipped. Delivery usually takes 2 days.
						</Text>
						<Text
							style={{
								margin: '0',
								marginTop: '24',
								lineHeight: '2',
								color: '#747474',
								fontWeight: '500',
							}}>
							Should you have any questions regarding your order, please feel free to
							contact us with your order number and we&apos;re here to help.
						</Text>
					</Section>
					<Hr style={{ borderColor: '#E5E5E5', margin: '0' }} />
					<Section
						style={{
							paddingLeft: '40px',
							paddingRight: '40px',
							paddingTop: '22px',
							paddingBottom: '22px',
						}}>
						<Text
							style={{
								margin: '0',
								lineHeight: '2',
								fontSize: '15px',
								fontWeight: 'bold',
							}}>
							Shipping to: {shippingAddress.name}
						</Text>
						<Text
							style={{
								margin: '0',
								lineHeight: '2',
								fontSize: '14px',
								fontWeight: 'bold',
							}}>
							{shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state},{' '}
							{shippingAddress.postalCode}
						</Text>
					</Section>
					<Hr style={{ borderColor: '#E5E5E5', margin: '0' }} />
					<Section
						style={{
							paddingLeft: '40px',
							paddingRight: '40px',
							paddingTop: '22px',
							paddingBottom: '22px',
						}}>
						<Row style={{ display: 'inline-flex', marginBottom: '40px' }}>
							<Column style={{ width: '170px' }}>
								<Text style={{ margin: '0', lineHeight: '2', fontWeight: 'bold' }}>
									Order Number
								</Text>
								<Text
									style={{
										margin: '12px 0 0 0',
										fontWeight: 500,
										lineHeight: '1.4',
										color: '#6F6F6F',
									}}>
									{orderId}
								</Text>
							</Column>
							<Column>
								<Text style={{ margin: '0', lineHeight: '2', fontWeight: 'bold' }}>
									Order Date
								</Text>
								<Text
									style={{
										margin: '12px 0 0 0',
										fontWeight: 500,
										lineHeight: '1.4',
										color: '#6F6F6F',
									}}>
									{orderDate}
								</Text>
							</Column>
						</Row>
					</Section>
					<Hr style={{ borderColor: '#E5E5E5', margin: '0' }} />
					<Section style={{ paddingTop: '22px', paddingBottom: '22px' }}>
						<Row>
							<Text
								style={{
									margin: '0',
									color: '#AFAFAF',
									fontSize: '13px',
									textAlign: 'center',
									paddingTop: '30px',
									paddingBottom: '30px',
								}}>
								Please contact us if you have any questions. (If you reply to this email
								we won&apos;t be able to see it.)
							</Text>
						</Row>
						<Row>
							<Text
								style={{
									margin: '0',
									color: '#AFAFAF',
									fontSize: '13px',
									textAlign: 'center',
								}}>
								© {new Date().getFullYear()} CaseCobra, Inc. All Rights Reserved.
							</Text>
						</Row>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};
