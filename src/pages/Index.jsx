import React, { useState } from "react";
import { Container, VStack, HStack, Text, Input, Box, Divider, Heading } from "@chakra-ui/react";

const Index = () => {
  const [currentYear, setCurrentYear] = useState({
    netIncome: 0,
    depreciation: 0,
    amortization: 0,
    currentAssets: 0,
    currentLiabilities: 0,
    debt: 0,
    equity: 0,
    capitalExpenditures: 0,
    investments: 0,
    salesDisposals: 0,
    netChangeDebt: 0,
    netChangeEquity: 0,
    dividendsPaid: 0,
  });

  const [previousYear, setPreviousYear] = useState({
    netIncome: 0,
    depreciation: 0,
    amortization: 0,
    currentAssets: 0,
    currentLiabilities: 0,
    debt: 0,
    equity: 0,
    capitalExpenditures: 0,
    investments: 0,
    salesDisposals: 0,
    netChangeDebt: 0,
    netChangeEquity: 0,
    dividendsPaid: 0,
  });

  const handleChange = (e, year, field) => {
    const value = parseFloat(e.target.value) || 0;
    if (year === "current") {
      setCurrentYear({ ...currentYear, [field]: value });
    } else {
      setPreviousYear({ ...previousYear, [field]: value });
    }
  };

  const calculateCashFlowFromOperations = (yearData) => {
    const netIncome = yearData.netIncome;
    const depreciation = yearData.depreciation;
    const amortization = yearData.amortization;
    const changesInWorkingCapital = yearData.currentAssets - previousYear.currentAssets - (yearData.currentLiabilities - previousYear.currentLiabilities);
    return netIncome + depreciation + amortization - changesInWorkingCapital;
  };

  const calculateCashFlowFromInvesting = (yearData) => {
    return yearData.capitalExpenditures + yearData.investments + yearData.salesDisposals;
  };

  const calculateCashFlowFromFinancing = (yearData) => {
    return yearData.netChangeDebt + yearData.netChangeEquity - yearData.dividendsPaid;
  };

  const currentCashFlowFromOperations = calculateCashFlowFromOperations(currentYear);
  const currentCashFlowFromInvesting = calculateCashFlowFromInvesting(currentYear);
  const currentCashFlowFromFinancing = calculateCashFlowFromFinancing(currentYear);
  const totalCurrentCashFlow = currentCashFlowFromOperations + currentCashFlowFromInvesting + currentCashFlowFromFinancing;

  return (
    <Container centerContent maxW="container.lg" py={10}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="xl">
          Indirect Cash Flow Statement
        </Heading>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>
            Income Statement
          </Heading>
          <HStack spacing={4}>
            <Text width="20%">Title</Text>
            <Text width="20%">Current Year</Text>
            <Text width="20%">Previous Year</Text>
          </HStack>
          <Divider />
          <HStack spacing={4}>
            <Text width="20%">Net Income</Text>
            <Input width="20%" type="number" value={currentYear.netIncome} onChange={(e) => handleChange(e, "current", "netIncome")} />
            <Input width="20%" type="number" value={previousYear.netIncome} onChange={(e) => handleChange(e, "previous", "netIncome")} />
          </HStack>
          <HStack spacing={4}>
            <Text width="20%">Depreciation</Text>
            <Input width="20%" type="number" value={currentYear.depreciation} onChange={(e) => handleChange(e, "current", "depreciation")} />
            <Input width="20%" type="number" value={previousYear.depreciation} onChange={(e) => handleChange(e, "previous", "depreciation")} />
          </HStack>
          <HStack spacing={4}>
            <Text width="20%">Amortization</Text>
            <Input width="20%" type="number" value={currentYear.amortization} onChange={(e) => handleChange(e, "current", "amortization")} />
            <Input width="20%" type="number" value={previousYear.amortization} onChange={(e) => handleChange(e, "previous", "amortization")} />
          </HStack>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>
            Balance Sheet
          </Heading>
          <HStack spacing={4}>
            <Text width="20%">Title</Text>
            <Text width="20%">Current Year</Text>
            <Text width="20%">Previous Year</Text>
          </HStack>
          <Divider />
          <HStack spacing={4}>
            <Text width="20%">Current Assets</Text>
            <Input width="20%" type="number" value={currentYear.currentAssets} onChange={(e) => handleChange(e, "current", "currentAssets")} />
            <Input width="20%" type="number" value={previousYear.currentAssets} onChange={(e) => handleChange(e, "previous", "currentAssets")} />
          </HStack>
          <HStack spacing={4}>
            <Text width="20%">Current Liabilities</Text>
            <Input width="20%" type="number" value={currentYear.currentLiabilities} onChange={(e) => handleChange(e, "current", "currentLiabilities")} />
            <Input width="20%" type="number" value={previousYear.currentLiabilities} onChange={(e) => handleChange(e, "previous", "currentLiabilities")} />
          </HStack>
          <HStack spacing={4}>
            <Text width="20%">Debt</Text>
            <Input width="20%" type="number" value={currentYear.debt} onChange={(e) => handleChange(e, "current", "debt")} />
            <Input width="20%" type="number" value={previousYear.debt} onChange={(e) => handleChange(e, "previous", "debt")} />
          </HStack>
          <HStack spacing={4}>
            <Text width="20%">Equity</Text>
            <Input width="20%" type="number" value={currentYear.equity} onChange={(e) => handleChange(e, "current", "equity")} />
            <Input width="20%" type="number" value={previousYear.equity} onChange={(e) => handleChange(e, "previous", "equity")} />
          </HStack>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>
            Cash Flow from Operations
          </Heading>
          <Text>Net Income: {currentYear.netIncome}</Text>
          <Text>Depreciation: {currentYear.depreciation}</Text>
          <Text>Amortization: {currentYear.amortization}</Text>
          <Text>Changes in Working Capital: {currentYear.currentAssets - previousYear.currentAssets - (currentYear.currentLiabilities - previousYear.currentLiabilities)}</Text>
          <Text>Cash Flow from Operations: {currentCashFlowFromOperations}</Text>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>
            Cash Flow from Investing
          </Heading>
          <HStack spacing={4}>
            <Text width="20%">Capital Expenditures</Text>
            <Input width="20%" type="number" value={currentYear.capitalExpenditures} onChange={(e) => handleChange(e, "current", "capitalExpenditures")} />
          </HStack>
          <HStack spacing={4}>
            <Text width="20%">Purchases/Sales of Investments</Text>
            <Input width="20%" type="number" value={currentYear.investments} onChange={(e) => handleChange(e, "current", "investments")} />
          </HStack>
          <HStack spacing={4}>
            <Text width="20%">Sales/Disposals of Property, Plant, and Equipment</Text>
            <Input width="20%" type="number" value={currentYear.salesDisposals} onChange={(e) => handleChange(e, "current", "salesDisposals")} />
          </HStack>
          <Text>Cash Flow from Investing: {currentCashFlowFromInvesting}</Text>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>
            Cash Flow from Financing
          </Heading>
          <HStack spacing={4}>
            <Text width="20%">Net Change in Debt</Text>
            <Input width="20%" type="number" value={currentYear.netChangeDebt} onChange={(e) => handleChange(e, "current", "netChangeDebt")} />
          </HStack>
          <HStack spacing={4}>
            <Text width="20%">Net Change in Equity</Text>
            <Input width="20%" type="number" value={currentYear.netChangeEquity} onChange={(e) => handleChange(e, "current", "netChangeEquity")} />
          </HStack>
          <HStack spacing={4}>
            <Text width="20%">Dividends Paid</Text>
            <Input width="20%" type="number" value={currentYear.dividendsPaid} onChange={(e) => handleChange(e, "current", "dividendsPaid")} />
          </HStack>
          <Text>Cash Flow from Financing: {currentCashFlowFromFinancing}</Text>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>
            Total Cash Flow
          </Heading>
          <Text>Total Cash Flow: {totalCurrentCashFlow}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
