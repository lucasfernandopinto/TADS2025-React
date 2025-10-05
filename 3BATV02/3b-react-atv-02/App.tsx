import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { Switch } from 'react-native';

function formatToBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

interface AccountData {
  name: string;
  age: number;
  gender: string;
  limit: number;
  isStudent: string;
}

export default function App() {
  const [name, setName] = useState('');
  const [ageText, setAgeText] = useState('');
  const [gender, setGender] = useState('');
  const [creditLimit, setCreditLimit] = useState(2500); // Valor inicial
  const [isStudent, setIsStudent] = useState(false);

  const [openedAccountData, setOpenedAccountData] =
    useState<AccountData | null>(null);

  const ageNumber = Number(ageText);
  
  const isNameValid = name.trim().length > 0; 

  const isAgeValid = !isNaN(ageNumber) && ageNumber >= 18; 
  
  const isGenderValid = gender !== ''; 

  const isFormValid = isNameValid && isAgeValid && isGenderValid;

  // Lógica para abrir a conta e exibir o resultado
  const handleOpenAccount = () => {
    if (isFormValid) {
      setOpenedAccountData({
        name,
        age: ageNumber,
        gender,
        limit: creditLimit,
        isStudent: isStudent ? 'Sim' : 'Não',
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.formCard}>
          <Text style={styles.title}>Simulador de Conta</Text>
          <Text style={styles.subtitle}>
            Insira seus dados para verificar a proposta de abertura.
          </Text>

          {/* Nome */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={[
                styles.input,
                !isNameValid && name.length > 0 && styles.inputError,
              ]}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              placeholderTextColor="#9ca3af"
            />
            {!isNameValid && name.length > 0 && (
              <Text style={styles.errorText}>O nome é obrigatório.</Text>
            )}
          </View>

          {/* Idade */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Idade</Text>
            <TextInput
              style={[
                styles.input,
                !isAgeValid && ageText.length > 0 && styles.inputError,
              ]}
              value={ageText}
              onChangeText={setAgeText}
              placeholder="Mínimo 18 anos"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
            {!isAgeValid && ageText.length > 0 && (
              <Text style={styles.errorText}>
                Idade deve ser $\geq 18$ e um valor numérico válido.
              </Text>
            )}
          </View>

          {/* Sexo (Picker) */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Gênero / Sexo</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={gender}
                style={styles.picker}
                onValueChange={(itemValue) => setGender(itemValue as string)}
              >
                <Picker.Item label="Selecione..." value="" color="#9ca3af" />
                <Picker.Item label="Masculino" value="Masculino" />
                <Picker.Item label="Feminino" value="Feminino" />
                <Picker.Item label="Outro" value="Outro" />
              </Picker>
            </View>
            {!isGenderValid && gender === '' && openedAccountData === null && (
              <Text style={styles.errorText}>A seleção de gênero é obrigatória.</Text>
            )}
          </View>

          {/* Limite da Conta (Slider) */}
          <View style={styles.sliderGroup}>
            <View style={styles.sliderHeader}>
              <Text style={styles.label}>Limite de Crédito Solicitado</Text>
              <Text style={styles.sliderValueText}>
                {formatToBRL(creditLimit)}
              </Text>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={500}
              maximumValue={10000}
              step={100}
              value={creditLimit}
              onValueChange={setCreditLimit}
              minimumTrackTintColor="#008080"
              maximumTrackTintColor="#e0f2f1"
              thumbTintColor="#008080"
            />
            <View style={styles.limitRange}>
              <Text style={styles.rangeText}>{formatToBRL(500)}</Text>
              <Text style={styles.rangeText}>{formatToBRL(10000)}</Text>
            </View>
          </View>

          {/* Estudante? (Switch) */}
          <View style={styles.switchGroup}>
            <Text style={styles.label}>Situação: É Estudante?</Text>
            <Switch
              value={isStudent}
              onValueChange={setIsStudent}
              trackColor={{ false: '#e0e7eb', true: '#008080' }}
              thumbColor={isStudent ? '#fff' : '#f4f3f4'}
            />
          </View>

          {/* Botão Abrir Conta (Usando Pressable para melhor feedback de touch) */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              !isFormValid && styles.buttonDisabled,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleOpenAccount}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>
              {isFormValid ? 'ABRIR MINHA CONTA AGORA' : 'Preencha todos os campos obrigatórios'}
            </Text>
          </Pressable>

          {/* Resultado (Renderização na Tela) */}
          {openedAccountData && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>
                🥳 Proposta de Conta Enviada!
              </Text>
              <View style={styles.resultBox}>
                <ResultRow label="Nome" value={openedAccountData.name} />
                <ResultRow label="Idade" value={`${openedAccountData.age} anos`} />
                <ResultRow label="Gênero" value={openedAccountData.gender} />
                <ResultRow label="Estudante" value={openedAccountData.isStudent} />
                <ResultRow
                  label="Limite Aprovado"
                  value={formatToBRL(openedAccountData.limit)}
                  isHighlight
                />
              </View>
              <Pressable
                style={({ pressed }) => [
                  styles.clearButton,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={() => setOpenedAccountData(null)}
              >
                <Text style={styles.clearButtonText}>Limpar Formulário</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

// Componente auxiliar para as linhas de resultado
const ResultRow = ({
  label,
  value,
  isHighlight = false,
}: {
  label: string;
  value: string;
  isHighlight?: boolean;
}) => (
  <View style={[styles.resultRow, isHighlight && styles.resultRowHighlight]}>
    <Text style={[styles.resultLabel, isHighlight && styles.resultLabelHighlight]}>
      {label}:
    </Text>
    <Text style={[styles.resultValue, isHighlight && styles.resultValueHighlight]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1', // Fundo em Verde Água (Teal) bem suave
    paddingTop: 40,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
  },
  formCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#008080', // Teal Escuro
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f9ff',
    paddingBottom: 16,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f8fafc',
    color: '#1e293b',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fee2e2',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 6,
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    overflow: 'hidden', // Importante para o Picker
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#1e293b',
  },
  sliderGroup: {
    paddingTop: 8,
    marginBottom: 16,
  },
  sliderHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sliderValueText: {
    color: '#008080',
    fontWeight: '700',
    fontSize: 20,
  },
  limitRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  rangeText: {
    fontSize: 12,
    color: '#64748b',
  },
  switchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f0f9ff', // Fundo de destaque
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bae6fd',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#008080', // Cor principal (Teal)
    shadowColor: '#008080',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
    shadowOpacity: 0,
    elevation: 0,
  },
  resultContainer: {
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: 2,
    borderTopColor: '#008080',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#059669', // Verde de sucesso
    marginBottom: 20,
    textAlign: 'center',
  },
  resultBox: {
    padding: 20,
    backgroundColor: '#f0fff4', // Fundo de resultado suave
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingVertical: 8,
  },
  resultRowHighlight: {
    borderBottomWidth: 0,
    paddingTop: 12,
  },
  resultLabel: {
    color: '#475569',
    fontWeight: '500',
    fontSize: 16,
  },
  resultValue: {
    color: '#1e293b',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultLabelHighlight: {
    color: '#008080',
    fontWeight: 'bold',
    fontSize: 18,
  },
  resultValueHighlight: {
    color: '#008080',
    fontWeight: '900',
    fontSize: 18,
  },
  clearButton: {
    width: '100%',
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#008080',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#008080',
    fontWeight: '700',
    textAlign: 'center',
  }
});
